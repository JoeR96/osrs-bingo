// app/api/bingo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ourBingoRouter } from "./core";

export async function POST(req: NextRequest) {
    try {
        const { name, description } = await req.json();
        const newBoard = await ourBingoRouter.createBingoBoard( name, description);
        return NextResponse.json(newBoard, { status: 201 });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
