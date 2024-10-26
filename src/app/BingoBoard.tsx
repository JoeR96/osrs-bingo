  import React from 'react';

  type BingoBoardProps = {
    name: string;
    description: string;
    accessCode: string;
    createdAt: string | number | Date;
    updatedAt: string | number | Date;
  };

  const BingoBoard = ({ board }: { board: BingoBoardProps }) => {
    return (
      <div className="p-6 bg-white shadow-md rounded-md w-80 mt-6">
        <h2 className="text-xl font-bold mb-2">{board.name}</h2>
        <p className="text-gray-600 mb-1">Description: {board.description}</p>
        <p className="text-gray-600 mb-1">Access Code: {board.accessCode}</p>
        <p className="text-gray-600 text-sm">Created At: {new Date(board.createdAt).toLocaleString()}</p>
        <p className="text-gray-600 text-sm">Updated At: {new Date(board.updatedAt).toLocaleString()}</p>
      </div>
    );
  };
  
  export default BingoBoard;
  