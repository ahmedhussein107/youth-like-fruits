import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import img from '../../../../assets/donor_icon.png';
import RequestCard from '../../../../AdminPage/DonorsList/RequestCard';
import { Box, TextField, MenuItem, Select, FormControl, FormLabel } from '@mui/material';
import ProductFilters from '../product-filters';
import Popup from '../../../../AdminPage/Popup';
import { donors } from '../../../_mock/donor';

export default function ProductsView(props) {
  const pageTitle = props.title;
  const sort = props.sort;
  const filter = props.filter;
  const search = props.search;
  const [openFilter, setOpenFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState('newest');
  const [openPopup, setOpenPopup] = useState(false);
  const [currentInfo, setCurrentInfo] = useState(null);

  const onPopupClose = () => {
    setOpenPopup(false);
  }

  const onPopupOpen = () => {
    setOpenPopup(true);
  }

  // const cards = [
  //   { date: '20/02/2020', name: 'Dr. Hamada', image: img, id: 1 },
  //   { date: '20/02/2020', name: 'Dr. Ahmed Hamada', image: img, id: 2 },
  //   { date: '20/02/2020', name: 'Dr. Ahmed Mohamed Hamada', image: img, id: 3 },
  //   { date: '20/02/2020', name: 'Dr. Wael', image: img, id: 4 },
  //   { date: '20/02/2020', name: 'Dr. Gohary', image: img, id: 5 },
  //   { date: '20/02/2020', name: 'Prof Yasser', image: img, id: 6 },
  //   { date: '20/02/2020', name: 'Dr. Tawfik', image: img, id: 7 },
  //   { date: '20/02/2020', name: 'Prof Slim', image: img, id: 8 },
  // ];

  const cards = donors;

  // Sorting function based on the selected sorting option
  const sortedCards = () => {
    switch (sorting) {
      case 'newest':
        return cards.slice().sort((a, b) => {
          const dayA = a.day;
          const monthA = a.month;
          const yearA = a.year;
          const dayB = b.day;
          const monthB = b.month;
          const yearB = b.year;
          return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
        });
      case 'oldest':
        return cards.slice().sort((a, b) => {
          const dayA = a.day;
          const monthA = a.month;
          const yearA = a.year;
          const dayB = b.day;
          const monthB = b.month;
          const yearB = b.year;
          return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
        });
      case 'lexicalAscending':
        return cards.slice().sort((a, b) => a.name.localeCompare(b.name));
      case 'lexicalDescending':
        return cards.slice().sort((a, b) => b.name.localeCompare(a.name));
      default:
        return cards;
    }
  };

  const filteredCards = searchTerm
    ? sortedCards().filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : sortedCards();

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSorting(event.target.value);
  };

  return (
    <Container>
      {openPopup && <Popup onClose={onPopupClose} info={currentInfo} />}
      <Stack direction="row" justifyContent="space-between" m={2}>
      <Box
        sx={{
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      />
        <Typography
          variant="h5"
          sx={{ color: '#000', fontFamily: 'sans-serif', fontWeight: 'bold' }}
        >
          {pageTitle}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {search && <TextField
            name="search"
            label="Search Donor"  
            onChange={handleChange}
            type="text"
            variant="outlined"
          />}
            
          {sort && <Select
            value={sorting}
            onChange={handleSortingChange}
            variant="outlined"
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="lexicalAscending">Lexicographical Ascending</MenuItem>
            <MenuItem value="lexicalDescending">Lexicographical Descending</MenuItem>
          </Select>}
          
          {filter && <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />}
        </Stack>
      </Stack>

      <Grid container spacing={3} mb={2}>
        {filteredCards.map((card) => (
          <Grid key={card.id} xs={12} sm={6} md={3}>
            <RequestCard 
            day={card.day}
            month={card.month}
            year={card.year}
            name={card.name} 
            image={card.image} 
            onClick={() => {
              setCurrentInfo(
                { fname: (card.name.split(" "))[0] ,
                  lname: (card.name.split(" "))[1] ,
                  image: card.image , 
                  date: card.date , 
                  type: card.type ,
                  contact: card.contact ,
                  email: card.email ,
                });
              onPopupOpen();
            }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
