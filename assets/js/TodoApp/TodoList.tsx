import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import TodoItem from './types/TodoItem';

interface TodoItemsQueryResult {
  todoItems: TodoItem[];
}

const TodoList = () => {
  const { data, loading } = useQuery<TodoItemsQueryResult>(gql`
    {
      todoItems {
        id
        content
        isCompleted
      }
    }
  `);

  return (
    <div className='todo_list'>
      <h3 className='todo_list__header'>Todo Items</h3>
      <ul className='todo_list__list'>
        {data?.todoItems
          ? data.todoItems.map((item) => (
              <li
                key={item.id}
                className={
                  item.isCompleted
                    ? 'todo_list__item p-2 todo_list__item--completed'
                    : 'todo_list__item p-2'
                }
              >
                <div className='flex md:flex-row flex-wrap'>
                  <div className='w-full md:w-3/4'>{item.content}</div>
                  <div className='w-full md:w-1/4 text-right text-gray-700'>
                    <label className='md:w-2/3 block text-gray-500 font-bold'>
                      <input
                        className='mr-2 leading-tight'
                        type='checkbox'
                        checked={item.isCompleted}
                      />
                      <span className='text-sm'>Done</span>
                    </label>
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TodoList;
