import { NextRequest, NextResponse } from "next/server";
import { ourBingoRouter } from "../../core";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id) throw new Error("ID parameter is missing.");
        
        const tasks = await ourBingoRouter.getBingoBoardTasks(id);
        return NextResponse.json(tasks, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching bingo board tasks:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id) throw new Error("ID parameter is missing.");
        
        const { taskIds } = await req.json();
        if (!Array.isArray(taskIds)) throw new Error("Invalid taskIds format.");
        
        await ourBingoRouter.addTasksToBoard(id, taskIds);
        return NextResponse.json({ message: "Tasks added successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error adding tasks to bingo board:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}