import React, { useState, FormEvent } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_TODO_ITEMS } from './TodoList';

const CREATE_TODO_ITEM = gql`
  mutation createTodoItem($content: String!) {
    createTodoItem(content: $content) {
      content
      id
      isCompleted
    }
  }
`;

const NewTodoForm = () => {
  const [content, setContent] = useState('');
  const [createTodo] = useMutation(CREATE_TODO_ITEM, {
    update(cache, { data: { createTodoItem: newTodo } }) {
      const { todoItems } = cache.readQuery({ query: GET_TODO_ITEMS });
      cache.writeQuery({
        query: GET_TODO_ITEMS,
        data: {
          todoItems: [...todoItems, newTodo],
        },
      });
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (content.trim() !== '') {
      createTodo({ variables: { content: content.trim() } });
      setContent('');
    }
  };
  return (
    <form className='todo_item new_todo_form flex' onSubmit={onSubmit}>
      <div className='w-1/12 h-auto flex items-center content-center'>
        <label className='md:w-2/3 block text-gray-500 font-bold'>
          <button
            className={
              'rounded-full h-8 w-8 self-center shadow-md border-solid border-2 border-gray-600 focus:outline-none bg-gray-400'
            }
          />
        </label>
      </div>
      <div className='w-11/12 h-auto flex items-center'>
        <input
          className={'todo_item__content focus:outline-none'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus
        />
      </div>
    </form>
  );
};

export default NewTodoForm;
