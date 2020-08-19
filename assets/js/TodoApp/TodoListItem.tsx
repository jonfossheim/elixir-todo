import React, { useCallback, useState, ChangeEvent } from 'react';
import TodoItem from './types/TodoItem';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { GET_TODO_ITEMS } from './TodoList';

const TOGGLE_TODO_ITEM = gql`
  mutation($id: ID!) {
    toggleTodoItem(id: $id) {
      content
      isCompleted
      id
    }
  }
`;

const UPDATE_TODO_ITEM = gql`
  mutation updateTodoItem($id: ID!, $content: String!) {
    updateTodoItem(id: $id, content: $content) {
      id
      content
    }
  }
`;

const DELETE_TODO_ITEM = gql`
  mutation deleteTodoItem($id: ID!) {
    deleteTodoItem(id: $id)
  }
`;

const TodoListItem = ({ id, content, isCompleted }: TodoItem) => {
  const [text, setText] = useState(content);

  const [toggleItem] = useMutation(TOGGLE_TODO_ITEM);
  const [updateItem] = useMutation(UPDATE_TODO_ITEM);
  const [deleteItem] = useMutation(DELETE_TODO_ITEM, {
    update(cache) {
      const { todoItems } = cache.readQuery({ query: GET_TODO_ITEMS });
      cache.writeQuery({
        query: GET_TODO_ITEMS,
        data: {
          todoItems: todoItems.filter((item: TodoItem) => item.id !== id),
        },
      });
    },
  });

  const handleToggle = useCallback(() => {
    toggleItem({ variables: { id } });
  }, [id, toggleItem]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value;
      setText(newText);
    },
    [setText]
  );

  const onBlur = useCallback(() => {
    if (text === '') {
      deleteItem({ variables: { id } });
      return;
    }
    if (text === content) return;
    updateItem({ variables: { id, content: text } });
  }, [text, updateItem]);

  return (
    <div className='todo_item flex'>
      <div className='w-1/12 h-auto flex items-center content-center'>
        <label className='md:w-2/3 block text-gray-500 font-bold'>
          <button
            className={`rounded-full h-8 w-8 self-center shadow-md border-solid border-2 border-gray-600 focus:outline-none ${
              isCompleted ? 'bg-green-400' : 'bg-gray-400'
            }`}
            onClick={handleToggle}
          />
        </label>
      </div>
      <div className='w-11/12 h-auto flex items-center'>
        <input
          className={` todo_item__content focus:outline-none ${
            isCompleted ? 'line-through' : ''
          }`}
          onChange={onChange}
          onBlur={onBlur}
          value={text}
        />
      </div>
    </div>
  );
};

export default TodoListItem;
