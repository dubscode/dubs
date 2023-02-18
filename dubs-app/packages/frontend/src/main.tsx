import './index.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { App } from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
  credentials: 'include',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
