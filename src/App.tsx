import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { resetScrollToTop } from './features/scroll/scrollSlice';

import { useAppDispatch, useAppSelector } from './hooks';

import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Footer } from './components/Footer';

export const App = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => state.menu.isOpen);

  // * invisible ref with no size to be able to scroll to the top
  // * with each page change
  const { shouldScrollToTop, behavior } = useAppSelector(
    (state) => state.scroll,
  );

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldScrollToTop) {
      // TODO decide if I need it smooth or instant
      // TODO { behavior: 'smooth' } inside scrollIntoView
      topRef.current?.scrollIntoView({ behavior });
      dispatch(resetScrollToTop());
    }
  }, [shouldScrollToTop, dispatch]);

  // TODO how to deal with it?
  // console.log('Device Pixel Ratio:', window.devicePixelRatio);
  // console.log('Zoom Level:', window.devicePixelRatio * 100 + '%');

  return (
    <div
      className="App"
      style={
        isOpen
          ? {
              overflow: 'hidden',
              position: 'fixed',
              width: '100%',
              height: '100%',
            }
          : {}
      }
    >
      <div
        ref={topRef}
        style={{ height: 0, overflow: 'hidden' }}
        id="topOfThePage"
      />

      <Header />

      <SideBar />

      <Outlet />

      <Footer />
    </div>
  );
};
