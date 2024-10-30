"use client";
import { useEffect, useState } from "react";
import { BingoBoard } from "~/types/types";
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

    useEffect(() => {
        const fetchAllTasks = async () => {
            const response = await fetch("/api/bingoboardtasks");
            const data = await response.json();
            setAllTasks(data);
        };

        fetchAllTasks();
    }, []);

    const handleTaskSelection = (taskId) => {
        setSelectedTasks((prevSelected) =>
            prevSelected.includes(taskId)
                ? prevSelected.filter((id) => id !== taskId)
                : [...prevSelected, taskId]
        );
    };

    const handleBoardClick = async (board) => {
        setSelectedBoard(board);
        const response = await fetch(`/api/bingoboard/tasks/${board.id}`);
        const data = await response.json();
        setBingoTasks(data);
        setSelectedTasks(data.map((task) => task.id));
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

    return (
        <div>
              <div >
                <div className="text-center text-gray-200">
                <h2 className="text-2xl font-bold mb-2">User Owned Bingo Boards</h2>
                <ul>
                {userOwnedBoards.map((board) => (
                    <li key={board.id} onClick={() => handleBoardClick(board)}>
                        <h3 className="mb-1">{board.name}</h3>
                    </li>
                ))}
            </ul>
                </div>
            </div>
          
            {selectedBoard && (
                <>
                    {bingoTasks.length > 0 ? (
                        <div className="flex flex-wrap justify-center mt-6 gap-4">
                            {bingoTasks.map((task, index) => (
                                <BingoBoardTask key={index} task={task} />
                            ))}
                        </div>
                    ) : (
                        <p>No tasks currently assigned to this board.</p>
                    )}
                    <h4>Select tasks to add:</h4>
                    <ul>
                        {allTasks.map((task) => (
                            <li key={task.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedTasks.includes(task.id)}
                                        onChange={() => handleTaskSelection(task.id)}
                                    />
                                    {task.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleAddTasksToBoard}>Add Selected Tasks to Board</button>
                </>
            )}
        </div>
    );
}
