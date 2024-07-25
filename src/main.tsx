import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './store';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { ProductList } from './components/ProductList';

import './index.css';
import { ItemCard } from './components/ItemCard';
import { ProductListWrapper } from './components/ProductListWraper/ProductListWraper';
import { Cart } from './pages/cart';

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
        path: 'favourites',
        element: <ProductList title="Favourites" category="favourites" />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: ':category',
        element: <ProductListWrapper />,
      },
      {
        path: ':category/:itemPage',
        element: <ItemCard />,
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
