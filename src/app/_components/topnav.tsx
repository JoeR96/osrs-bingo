"use client"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import CreateBingoBoard from "../ImplentCreateBingoFormLater";
import useBoardStore from "../state/bingoboardstore";

export function TopNav() {
    const {resetBoardData} = useBoardStore();

    const handleHomeClick = () => {
        resetBoardData();
    };

    return (
      <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border-b space">
        <div>Bingo Board</div>
        <div className="flex items-center space-x-4">
            <button onClick={handleHomeClick}>Home</button>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <CreateBingoBoard />
                <UserButton />
            </SignedIn>
        </div>
      </nav>
    )
}
