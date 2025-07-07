// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `osrs-bingo_${name}`);

export const bingo_tasks = createTable(
  "bingo_task",
  {
    id: serial("id").primaryKey(),
    vegetable: varchar("vegetable", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("bingo_task_name_idx").on(example.name),
  })
);

export const bingo_boards = createTable(
  "bingo_boards",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }).notNull(),
    accessCode: varchar("access_code", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("bingo_boards_name_idx").on(example.name),
  })
);

export const bingo_board_tasks = createTable(
  "bingo_board_tasks",
  {
    bingoBoardId: integer("bingo_board_id")
      .notNull()
      .references(() => bingo_boards.id, { onDelete: "cascade" }),
    bingoTaskId: integer("bingo_task_id")
      .notNull()
      .references(() => bingo_tasks.id, { onDelete: "cascade" }),
  },
  (example) => ({
    boardTaskIndex: index("bingo_board_task_idx").on(example.bingoBoardId, example.bingoTaskId),
  })
);
