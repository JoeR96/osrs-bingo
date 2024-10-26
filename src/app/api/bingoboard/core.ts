// core.ts
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { bingo_boards } from "~/server/db/schema";
import { BingoBoard } from "~/types/types";
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

    async getBingoBoard(id: string) {
        const board = await db.query.bingo_boards.findFirst({ where: eq(bingo_boards.accessCode, id) });

        if (!board) throw new Error("Board not found");

        console.log(board)
        return board;
    },
};

export type ourBingoRouter = typeof ourBingoRouter;

