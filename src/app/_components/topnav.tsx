"use client";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import CreateBingoBoard from "../ImplentCreateBingoFormLater";
import useBoardStore from "../state/bingoboardstore";

export function TopNav() {
    const router = useRouter();
    const { resetBoardData } = useBoardStore();

    const handleHomeClick = () => {
        resetBoardData();
        router.push("/"); 
    };

    const handleEditBingoBoardClick = () => {
        router.push("/bingoboard"); 
    };

    const handleTasksClick = () => {
        router.push("/bingotasks"); 
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
                <button onClick={handleTasksClick}>Tasks</button>
                <CreateBingoBoard />
                <button onClick={handleEditBingoBoardClick}>Edit Bingo Board</button>
                <UserButton />
            </SignedIn>
        </div>
      </nav>
    );
}
