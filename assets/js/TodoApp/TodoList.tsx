import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import TodoItem from './types/TodoItem';
import TodoListItem from './TodoListItem';
import NewTodoButton from './NewTodoButton';
import NewTodoForm from './NewTodoForm';

interface TodoItemsQueryResult {
  todoItems: TodoItem[];
}

export const GET_TODO_ITEMS = gql`
  {
    todoItems {
      id
      content
      isCompleted
    }
  }
`;

const TodoList = () => {
  const { data, loading } = useQuery<TodoItemsQueryResult>(GET_TODO_ITEMS);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='todo_list bg-gray-100'>
      <h3>hello</h3>
      <ul className='todo_list__list'>
        {data?.todoItems
          ? data.todoItems
              .sort((x, y) => {
                return x === y ? 0 : x ? -1 : 1;
              })
              .map((item) => <TodoListItem key={item.id} {...item} />)
          : null}
      </ul>
      {showForm ? <NewTodoForm /> : null}
      <div className='todo_list__spacer'></div>
      <footer className='todo_list__footer'>
        <NewTodoButton onClick={() => setShowForm(true)} />
      </footer>
    </div>
  );
};

export default TodoList;
