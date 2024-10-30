import { NextRequest, NextResponse } from "next/server";
import { ourBingoRouter } from "../core";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const boards = await ourBingoRouter.getUserBingoBoards();
        return NextResponse.json(boards, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching bingo board:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}