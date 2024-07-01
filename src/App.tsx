import { Outlet, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideBar } from './components/SideBar';
import { useState } from 'react';

/*
TODO

3. move all used images and api from public folder
*/

export const App = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <Header onBurgerClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

      <div className="p-4">Current path: {location.pathname}</div>

      <SideBar isOpen={isOpen} onBurgerClick={() => setIsOpen(!isOpen)} />

      <Outlet />

      <Footer />
    </div>
  );
};
