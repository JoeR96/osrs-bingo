import { NextRequest, NextResponse } from "next/server";
import { ourBingoRouter } from "../core";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        console.log("DID WE HIT");  // Log to confirm the request reaches here
        console.log("Params:", params);  // Ensure params contains { id: "some-id" }
        
        const { id } = params;
        if (!id) throw new Error("ID parameter is missing.");
        
        const board = await ourBingoRouter.getBingoBoard(id);
        return NextResponse.json(board, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching bingo board:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
