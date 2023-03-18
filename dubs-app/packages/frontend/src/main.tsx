import './index.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { App } from './App';
import { Dashboard } from './pages/dashboard';
import { Error } from './error';
import { Home } from './pages/home';
import { Login } from './pages/login';
import React from 'react';
import ReactDOM from 'react-dom/client';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
  credentials: 'include',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
