import { db } from "~/server/db";

export const ourBingoTaskRouter = {
    async getBingoTasks() {
        const tasks = await db.query.bingo_tasks.findMany({
            orderBy: (model, { desc }) => desc(model.id),
          })
        return tasks;
    },
};
export type ourBingoTaskRouter = typeof ourBingoTaskRouter;
