// core.ts
import { auth } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";
import { get } from "http";
import { db } from "~/server/db";
import { bingo_board_tasks, bingo_boards, bingo_tasks } from "~/server/db/schema";
import { generateAccessCode } from "~/utils/accessTokenGenerator";

export const ourBingoRouter = {
    async createBingoBoard(name: string, description: string) {
        const user = auth();

        if (!user.userId) throw new Error("Unauthorized");

        const newBoard = await db.insert(bingo_boards).values({
            userId: user.userId,
            name,
            description,
            accessCode: generateAccessCode(),
        });
        
        return newBoard;
    },

    async getBingoBoardById(id: string) {
        const board = await db.query.bingo_boards.findFirst({ where: eq(bingo_boards.id, id) });

        if (!board) throw new Error("Individual board not found");

        console.log(board)
        return board;
    },

    async getBingoBoardByAccessCode(access_code: string) {
        const board = await db.query.bingo_boards.findFirst({ where: eq(bingo_boards.accessCode, access_code) });

        if (!board) throw new Error("Individual board not found");

        console.log(board)
        return board;
    },

    async getBingoBoardTasks(id: string) {
        const board = await db.query.bingo_boards.findFirst({ where: eq(bingo_boards.id, id) });
        console.log("Id", id);
        if (!board) throw new Error("Board not found");

        const boardTaskIds = await db.query.bingo_board_tasks.findMany({
            where: eq(bingo_board_tasks.bingoBoardId, board.id),
            select: (fields) => fields.taskId,
        });

        if (!boardTaskIds || boardTaskIds.length === 0) return [];

        const taskIds = boardTaskIds.map(task => task.bingoTaskId);

        const tasks = await db.query.bingo_tasks.findMany({
            where: inArray(bingo_tasks.id,taskIds),
        });

        if (!tasks || tasks.length === 0) return [];

        console.log("task count", tasks.length);
        return tasks;
    },

    async getUserBingoBoards() {  
        const user = auth();
        if (!user.userId) throw new Error("Unauthorized");
        
        const boards = await db.query.bingo_boards.findMany({
            where: eq(bingo_boards.userId, user.userId as string),
            orderBy: (model, { desc }) => desc(model.id),
          });

        if (!boards) throw new Error("User board's not found");

        return boards;
    },

    async addTasksToBoard(id: string, taskIds: string[]) {
        const user = auth();
        if (!user.userId) throw new Error("Unauthorized");

        const board = await db.query.bingo_boards.findFirst({ where: eq(bingo_boards.id, id) });
        if (!board) throw new Error("Board not found");

        const tasks = await db.query.bingo_tasks.findMany({
            where: inArray(bingo_tasks.id, taskIds),
            orderBy: (model, { desc }) => desc(model.id),
          });

        if (!tasks) throw new Error("Tasks not found");

                await Promise.all(tasks.map(task => 
                        db.insert(bingo_board_tasks).values({
                                bingoBoardId: board.id,
                                bingoTaskId: task.id,
                        })
                ));
    },
};

export type ourBingoRouter = typeof ourBingoRouter;

