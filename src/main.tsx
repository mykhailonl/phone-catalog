import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './store';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { Cart } from './pages/CartPage';

import { ItemCard } from './components/ItemCard';
import { ProductListWrapper } from './components/ProductListWraper/ProductListWraper';
import { FavouritesList } from './components/FavouritesList';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'catalog',
        children: [
          {
            path: ':category',
            element: <ProductListWrapper />,
          },
          {
            path: ':category/:itemPage',
            element: <ItemCard />,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'favourites',
            element: <FavouritesList />,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
        ],
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
