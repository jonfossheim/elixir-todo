import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import TodoItem from './types/TodoItem';
import TodoListItem from './TodoListItem';

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
      <ul className='todo_list__list'>
        {data?.todoItems
          ? data.todoItems
              .sort((x, y) => {
                return x === y ? 0 : x ? -1 : 1;
              })
              .map((item) => <TodoListItem key={item.id} {...item} />)
          : null}
      </ul>
    </div>
  );
};

export default TodoList;
