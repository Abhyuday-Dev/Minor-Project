import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import Landing from '../Components/Landing';
import RestaurantReview from '../Components/RestaurentReview';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function Home() {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const DrawerList = (
    <Box sx={{ width: 250, bgcolor: '#5624d0', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
      <List>
        {[
          { text: 'Restaurant', icon: <RestaurantIcon sx={{ color: 'white', fontSize: '2rem' }} /> },
          { text: 'Option 2', icon: <InboxIcon sx={{ color: 'white', fontSize: '2rem' }} /> },
          { text: 'Option 3', icon: <MailIcon sx={{ color: 'white', fontSize: '2rem' }} /> }
        ].map(({ text, icon }) => (
          <ListItem key={text}>
            <ListItemButton onClick={() => handleOptionClick(text)}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderPage = () => {
    switch (selectedOption) {
      case 'Restaurant':
        return (
          <Box sx={{ color: 'black', height: '100vh', padding: '60px' }}>
            <Typography variant="h4"><RestaurantReview /></Typography>
          </Box>
        );
      case 'Option 2':
        return (
          <Box sx={{ backgroundColor: 'purple', color: 'white', height: '80vh', padding: '20px' }}>
            <Typography variant="h4"></Typography>
          </Box>
        );
      case 'Option 3':
        return (
          <Box sx={{ backgroundColor: 'purple', color: 'white', height: '80vh', padding: '20px' }}>
            <Typography variant="h4">Option 3 Selected</Typography>
          </Box>
        );
      default:
        return (
          <Box sx={{ backgroundColor: 'purple', color: 'white', height: '80vh', padding: '20px' }}>
            <Typography variant="h4"><Landing /></Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            bgcolor: '#5624d0',
            color: 'white',
            marginTop: '73px', // Adjust the margin top here
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {DrawerList}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        {renderPage()}
      </Box>
    </Box>
  );
}
