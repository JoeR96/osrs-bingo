import { create } from "zustand";

import { BingoBoard } from "~/types/types";

interface BoardState {
  boardData: BingoBoard | null; 
  setBoardData: (data: BingoBoard) => void;
  resetBoardData: () => void;
}

const useBoardStore = create<BoardState>((set) => ({
  boardData: null,
  setBoardData: (data) => set({ boardData: data }),
  resetBoardData: () => set({ boardData: null }),
}));

export default useBoardStore;
