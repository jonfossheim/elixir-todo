import React from 'react';
import TodoItem from './types/TodoItem';

const TodoListItem = ({ id, content, isCompleted }: TodoItem) => {
  return (
    <div className='todo_item'>
      <button
        className={`todo_item__toggle ${
          isCompleted ? 'todo_item__toggle--completed' : ''
        }`}
      />
      <p>{content}</p>
    </div>
  );
};

export default TodoListItem;
