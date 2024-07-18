import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideBar } from './components/SideBar';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <SideBar />

      <Outlet />

      <Footer />
    </div>
  );
};
