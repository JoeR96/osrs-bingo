// app/api/bingo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ourBingoTaskRouter } from "./core";

export async function GET(req: NextRequest) {
    try {
        const tasks = await ourBingoTaskRouter.getBingoTasks();
        return NextResponse.json(tasks, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}