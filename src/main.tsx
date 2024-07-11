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
        // TODO productUrl?
        element: <ProductList title="Favourites" productsUrl="" />,
      },
      {
        path: 'phones',
        element: (
          <ProductList title="Mobile phones" productsUrl="./api/phones.json" />
        ),
      },
      {
        path: 'tablets',
        element: (
          <ProductList title="Tablets" productsUrl="./api/tablets.json" />
        ),
      },
      {
        path: 'accessories',
        element: (
          <ProductList
            title="Accessories"
            productsUrl="./api/accessories.json"
          />
        ),
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
