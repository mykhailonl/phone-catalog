import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideBar } from './components/SideBar';
import { useAppDispatch, useAppSelector } from './hooks';
import { useEffect, useRef } from 'react';
import { resetScrollToTop } from './features/scroll/scrollSlice';

export const App = () => {
  const dispatch = useAppDispatch();

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

  return (
    <div className="App">
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
