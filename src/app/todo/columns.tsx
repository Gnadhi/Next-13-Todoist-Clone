"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const todoSchema = z.object({
  description: z.string(),
  dueData: z.date(),
});

export type Todo = z.infer<typeof todoSchema>;

//TOOD: Fix later to use zod correctly
export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "description",
    header: () => (
      <>
        <span className="font-medium">Description</span>
      </>
    ),
    cell: ({ row }) => <> {row.getValue("description")}</>,
  },
];
