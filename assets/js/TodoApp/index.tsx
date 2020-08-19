import React from 'react';
import client from './client';
import { ApolloProvider } from '@apollo/react-hooks';
import TodoList from './TodoList';

const TodoApp = () => {
  return (
    <ApolloProvider client={client}>
      <div className='wrapper bg-gray-100'>
        <h1 className='text-4xl'>Elixir, Graphql & React</h1>
        <TodoList />
      </div>
    </ApolloProvider>
  );
};

export default TodoApp;
