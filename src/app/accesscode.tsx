import { useState, FormEvent } from "react";
import useBoardStore from "./state/bingoboardstore";



export const AccessCodeBox = () => {
    const [code, setCode] = useState<string>("");
    const { setBoardData } = useBoardStore();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`/api/bingoboard/${code}`, {
                method: 'GET'
            });
    
            console.log(response);
            if (!response.ok) throw new Error("Failed to fetch bingo board");
    
            const board = await response.json();
            setBoardData(board);
            console.log("Fetched bingo board:", board);
        } catch (error) {
            console.error("Error fetching bingo board:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md w-80"
        >
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Access Code"
                className="p-3  bg-black border-4 border-grey-1200  rounded w-full text-center text-white-700 focus:outline-none focus:border-yellow-700 mb-4"
            />
            <button
                type="submit"
                className="w-full px-4 py-2 bg-black text-white font-semibold rounded hover:bg-yellow-700 transition duration-200 ease-in-out"
            >
                Access Board
            </button>
        </form>
    );
};

export default AccessCodeBox;