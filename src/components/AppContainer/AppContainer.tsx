import { Navbar } from '@components/Navbar/Navbar';
import Box from '@mui/material/Box/Box';
import { Outlet } from 'react-router-dom';

export const AppContainer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Outlet />
    </Box>
  );
};
