import React from 'react';

interface Props {
  onClick(): void;
}

const NewTodoButton = ({ onClick }: Props) => {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={onClick}
    >
      new todo
    </button>
  );
};

export default NewTodoButton;
