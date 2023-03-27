import { Navbar } from '@components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export const AppContainer = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
