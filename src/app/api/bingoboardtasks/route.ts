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

export async function POST(req: NextRequest) {
    try {
        const { name, url, description } = await req.json();
        const newTask = await ourBingoTaskRouter.createBingoTask(name, url, description);
        return NextResponse.json(newTask, { status: 201 });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 });
    }};