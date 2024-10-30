import { NextRequest, NextResponse } from "next/server";
import { ourBingoRouter } from "../../bingoboard/core";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id) throw new Error("ID parameter is missing.");
        
        const board = await ourBingoRouter.getBingoBoardByAccessCode(id);
        return NextResponse.json(board, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching bingo board:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}



