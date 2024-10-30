"use client";

import AccessCodeBox from "./accesscode";
import BingoBoard from "./BingoBoard";
import useBoardStore from "./state/bingoboardstore";

export default function HomePage() {
  const { boardData, setBoardData } = useBoardStore();

return (
  <main >
    {boardData ? <BingoBoard board={boardData} /> : 
      <div className="flex justify-center items-center">
        <AccessCodeBox />
      </div>}
  </main>
);
}
