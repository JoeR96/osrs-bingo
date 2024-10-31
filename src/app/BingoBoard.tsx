import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
export const dynamic = "force-dynamic";

type BingoBoardProps = {
  name: string;
  description: string;
  accessCode: string;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
};
const BingoBoard = ({ board }: { board: BingoBoardProps }) => {

  const [bingoTasks, setBingoTasks] = useState<BingoBoardTask[]>([]);
  const getBoardTasks = async () => {
    const response = await fetch(`/api/bingoboard/tasks/${board.id}`);
    const data = await response.json();
    setBingoTasks(data);
};

useEffect(() => {
    getBoardTasks();
}, [board]);
  return (
      <div className='p-6 bg-gray-900 rounded-lg h-100'>
        <h2 className="text-6xl font-extrabold text-center mb-2">{board.name}</h2>
        <div className="flex flex-wrap justify-center mt-6 gap-4">
          {bingoTasks.map((task, index) => (
            <BingoBoardTask key={index} task={task} />
          ))}
        </div>
      </div>
  );
};

export const BingoBoardTask = ({ task }: { task: BingoTask }) => {
  return (
    <div className="bg-gray-800 p-4 shadow-md rounded-lg w-64">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1 text-center">{task.name}</h3>
          <p className="text-gray-400 text-center">{task.description}</p>
        </div>
        <div className="relative w-full h-14  flex items-center justify-center rounded-md mt-2">
          <Image
            src={task.url}
            alt={task.name}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default BingoBoard;

export interface BingoTask {
  id: number;
  name: string;
  description: string;
  url: string;
  quantity: number;
}

const dummyTasks: BingoTask[] = [
  {
    id: 1,
    name: "Tombs of Amascut Chest",
    description: "Open the Tombs of Amascut chest.",
    url: "https://oldschool.runescape.wiki/images/Chest_%28Tombs_of_Amascut%2C_open%29.png?a0d1e",
    quantity: 1,
  },
  {
    id: 2,
    name: "Ancient Chest",
    description: "Find and open the ancient chest.",
    url: "https://oldschool.runescape.wiki/images/Ancient_chest.png?7727b",
    quantity: 1,
  },
  {
    id: 3,
    name: "Monumental Chest",
    description: "Unlock the monumental chest for your teammate.",
    url: "https://oldschool.runescape.wiki/images/Monumental_chest_%28teammate%27s%2C_closed%29.png?86e6f",
    quantity: 1,
  },
  {
    id: 4,
    name: "Barrows Brothers",
    description: "Defeat all the Barrows Brothers.",
    url: "https://oldschool.runescape.wiki/images/Chest_%28Barrows%29.png?9aff2",
    quantity: 1,
  },
  {
    id: 5,
    name: "Kalphite Queen",
    description: "Defeat the Kalphite Queen.",
    url: "https://oldschool.runescape.wiki/images/Kalphite_Queen.png",
    quantity: 1,
  },
  {
    id: 6,
    name: "Zulrah's Snakeling",
    description: "Collect a Zulrah's snakeling pet.",
    url: "https://oldschool.runescape.wiki/images/Snakeling.png?f371a",
    quantity: 1,
  },
  {
    id: 7,
    name: "Fire Cape",
    description: "Obtain a Fire Cape from the TzHaar Fight Cave.",
    url: "https://oldschool.runescape.wiki/images/Fire_cape.png",
    quantity: 1,
  },
  {
    id: 8,
    name: "Draconic Visage",
    description: "Obtain a Draconic Visage drop.",
    url: "https://oldschool.runescape.wiki/images/Draconic_visage.png",
    quantity: 1,
  },
  {
    id: 9,
    name: "Slayer Helmet",
    description: "Craft and wear a full Slayer helmet.",
    url: "https://oldschool.runescape.wiki/images/Slayer_helmet.png",
    quantity: 1,
  },
  {
    id: 10,
    name: "Rune Platebody",
    description: "Create your own rune platebody.",
    url: "https://oldschool.runescape.wiki/images/Rune_platebody.png",
    quantity: 1,
  },
  {
    id: 11,
    name: "Bandos boots",
    description: "Obtain Bando's boots.",
    url: "https://oldschool.runescape.wiki/images/Bandos_boots_detail.png?9bcc8",
    quantity: 1,
  },
  {
    id: 12,
    name: "Craft a Super Combat Potion",
    description: "Craft a Super Combat Potion.",
    url: "https://oldschool.runescape.wiki/images/Super_combat_potion%284%29_detail.png?8ee49",
    quantity: 1,
  }
];