"use client";
import { useEffect, useState, useRef } from "react";
import { BingoBoard as BingoBoardType } from "~/types/types";
import BingoBoard, { BingoBoardTask } from "../BingoBoard";

export default function EditBingoBoard() {

    const [userOwnedBoards, setUserOwnedBoards] = useState<BingoBoard[]>([]);
    const [bingoTasks, setBingoTasks] = useState<BingoBoard[]>([]);
    const [selectedBoard, setSelectedBoard] = useState<BingoBoard | null>(null);

    useEffect(() => {
        const fetchUserOwnedBoards = async () => {
            const response = await fetch("/api/bingoboard/user");
            const data = await response.json();
            setUserOwnedBoards(data);
        };

        fetchUserOwnedBoards();
    }, []);

    return (
        <div>
            <UserOwnedBingoBoards 
                userOwnedBoards={userOwnedBoards} 
                selectedBoard={selectedBoard}
                setSelectedBoard={setSelectedBoard}
                bingoTasks={bingoTasks}
                setBingoTasks={setBingoTasks}
            />
        </div>
    );
}

function UserOwnedBingoBoards({ userOwnedBoards, selectedBoard, setSelectedBoard, bingoTasks, setBingoTasks }) {
    const [allTasks, setAllTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchAllTasks = async () => {
            const response = await fetch("/api/bingoboardtasks");
            const data = await response.json();
            setAllTasks(data);
        };

        fetchAllTasks();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleTaskSelection = (taskId) => {
        setSelectedTasks((prevSelected) =>
            prevSelected.includes(taskId)
                ? prevSelected.filter((id) => id !== taskId)
                : [...prevSelected, taskId]
        );
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setIsDropdownVisible(event.target.value !== "");
    };

    const handleBoardClick = async (board) => {
        setSelectedBoard(board);
        const response = await fetch(`/api/bingoboard/tasks/${board.id}`);
        const data = await response.json();
        setBingoTasks(data);
    };

    const handleAddTasksToBoard = async () => {
        if (selectedBoard) {
            await fetch(`/api/bingoboard/tasks/${selectedBoard.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskIds: selectedTasks }),
            });
            const response = await fetch(`/api/bingoboard/tasks/${selectedBoard.id}`);
            const data = await response.json();
            setBingoTasks(data);
        }
    };

    const filteredTasks = allTasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex ml-20">
            <div className="w-1/4 pt-20">
                <div className="text-center text-gray-200 bg-gray-800 border border-gray-800 rounded-md p-4 m-8 m-t">
                    <h2 className="text-2xl font-bold mb-2">User Owned Bingo Boards</h2>
                    <ul>
                        {userOwnedBoards.map((board) => (
                            <li key={board.id} onClick={() => handleBoardClick(board)}>
                                <h3 className="mb-1 cursor-pointer">{board.name}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-center text-gray-200 bg-gray-800 border border-gray-800 rounded-md p-4 m-8 m-t">
                    <h2 className="text-xl font-bold mb-2 text-gray-200">Add Tasks to Board</h2>
                    <div ref={dropdownRef}>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onClick={() => setIsDropdownVisible(true)}
                            className="block w-full px-3 py-2 mb-2 border border-gray-600 rounded bg-gray-800 text-white"
                        />
                        {isDropdownVisible && (
                            <div className="max-h-40 overflow-y-auto border border-gray-600 rounded bg-gray-800 text-white">
                                {filteredTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={`flex items-center mb-2 p-2 cursor-pointer hover:bg-gray-700 ${selectedTasks.includes(task.id) ? 'bg-gray-700' : ''}`}
                                        onClick={() => handleTaskSelection(task.id)}
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedTasks.includes(task.id)}
                                            readOnly
                                        />
                                        <img src={task.url} alt={task.name} className="w-6 h-6 mr-2" />
                                        <span>{task.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button 
                            onClick={handleAddTasksToBoard} 
                            className="mt-2 bg-slate-500 hover:bg-slate-400 text-white p-2 rounded"
                        >
                            Add Selected Tasks to Board
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-3/4">
                {selectedBoard && (
                    <BingoBoard board={selectedBoard} />
                )}
            </div>
        </div>
    );
}
