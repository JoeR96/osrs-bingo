"use client";

import AccessCodeBox from "./accesscode";
import BingoBoard from "./BingoBoard";
import useBoardStore from "./state/bingoboardstore";

export default function HomePage() {
  const { boardData, setBoardData } = useBoardStore();

return (
  <main className="flex flex-col items-center justify-center">
    {boardData ? <BingoBoard board={boardData} /> : <AccessCodeBox />}
  </main>
);
}
