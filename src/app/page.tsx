"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import AccessCodeBox from "./accesscode";
import CreateBingoBoard from "./ImplentCreateBingoFormLater";
import BingoBoard from "./BingoBoard";
import useBoardStore from "./state/bingoboardstore";

export default function HomePage() {
  const { boardData, setBoardData } = useBoardStore();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <SignedOut>
        <AccessCodeBox />
      </SignedOut>
      <SignedIn>
            {boardData ? <BingoBoard board={boardData} /> : <AccessCodeBox />}
      </SignedIn>
    </main>
  );
}
