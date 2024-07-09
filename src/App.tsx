import { Outlet, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideBar } from './components/SideBar';

/*
TODO

3. move all used images and api from public folder
*/

export const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Header />

      <div className="p-4">Current path: {location.pathname}</div>

      <SideBar />

      <Outlet />

      <Footer />
    </div>
  );
};
