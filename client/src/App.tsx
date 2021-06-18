import React from 'react';

import BookList from './components/BookList';
import Addbook from './components/Addbook';



import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
  } from "@apollo/client";


const client = new ApolloClient({
          uri:'http://localhost:4000/catlouge',
          cache:new InMemoryCache()
          

 })


function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <h1>Huck's Book Catlouges</h1>
      <BookList/>
      <Addbook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
