import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {Alert} from '@mui/material';
import img from '../../../../assets/donor_icon.png';
import RequestCard from '../../../../AdminPage/DonorsList/RequestCard';
import { Box, TextField, MenuItem, Select, FormControl, FormLabel } from '@mui/material';
import FilterOrganizations from '../../products/filterOrganization';
import Popup from '../../../../AdminPage/OrganizationsLists/Popup';
import { organization } from '../../../_mock/organization';

export default function RegisteredView(props) {
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

  // const cards = donors;
  const [cards , setCards] = useState(organization);
  const [selectedId , setSelectedId] = useState(null);

  // Sorting function based on the selected sorting option
  const sortedCards = () => {
    switch (sorting) {
      case 'newest':
        return cards.filter(card => isGood(card)).slice().sort((a, b) => {
          const dayA = a.day;
          const monthA = a.month;
          const yearA = a.year;
          const dayB = b.day;
          const monthB = b.month;
          const yearB = b.year;
          return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
        });
      case 'oldest':
        return cards.filter(card => isGood(card)).slice().sort((a, b) => {
          const dayA = a.day;
          const monthA = a.month;
          const yearA = a.year;
          const dayB = b.day;
          const monthB = b.month;
          const yearB = b.year;
          return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
        });
      case 'lexicalAscending':
        return cards.filter(card => isGood(card)).slice().sort((a, b) => a.name.localeCompare(b.name));
      case 'lexicalDescending':
        return cards.filter(card => isGood(card)).slice().sort((a, b) => b.name.localeCompare(a.name));
      default:
        return cards.filter(card => isGood(card));
    }
  };

  const [currentFilters , setCurrentFilters] = useState(null);

  const isGood = (card) => {
    console.log(currentFilters);
    console.log(card.type);
    if (currentFilters === null ||currentFilters.type === null) return true;
    return card.type === currentFilters.type;
  }

  const filteredCards = searchTerm
    ? sortedCards().filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) && isGood(card)
    )
    : sortedCards().filter(card => isGood(card));

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

  const handleDelete = (event) => {
    const newCardList = cards.filter(card => card.id !== selectedId);
    setCards(newCardList);
  }

  const [showAlert, setShowAlert] = useState(false);
  
  const showThatAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }

  const [alertType , setAlertType] = useState(null);

  return (
    <Container>
      {openPopup && <Popup 
        onClose={onPopupClose} 
        info={currentInfo} 
      />}
      <Stack direction="row" justifyContent="space-between" m={2}>
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
          
          {filter && <FilterOrganizations
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            set={setCurrentFilters}
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
            organization={card.company} 
            onClick={() => {
              setSelectedId(card.id);
              setCurrentInfo(
                { name: card.name ,
                  age: card.age ,
                  image: card.image , 
                  date: `${card.day}/${card.month}/${card.year}` , 
                  type: card.type ,
                  phoneNumber: card.phoneNumber ,
                  email: card.email ,
                  organization: card.company,
                  occupation: card.type,
                  id: card.id ,
                });
              onPopupOpen();
            }} />
          </Grid>
        ))}
      </Grid>
      {showAlert && (
          <Alert severity={'success'} onClose={() => setShowAlert(false)}>
            {alertType==='accept' ? 
              'Donor Submession has been approved successfully!' : 
              'Donor Submession has beed disapproved successfully!'}
          </Alert>)}
    </Container>
  );
}
