import { create } from "domain";
import { db } from "~/server/db";
import { bingo_tasks } from "~/server/db/schema";

export const ourBingoTaskRouter = {
    async getBingoTasks() {
        const tasks = await db.query.bingo_tasks.findMany({
            orderBy: (model, { desc }) => desc(model.id),
          })
        return tasks;
    },
    async createBingoTask(name: string, url: string, description: string) {
        const newTask = await db.insert(bingo_tasks).values({
            name : name,
            url : url,
            description : description
        });
        return newTask;
    },
};
export type ourBingoTaskRouter = typeof ourBingoTaskRouter;
