"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  amount: z.number(),
  email: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;

//TOOD: FIx later to use zod correctly
export const columns: ColumnDef<Todo>[] = [
  {
    header: "amount",
    accessorKey: "amount",
  },
  {
    header: "email",
    accessorKey: "email",
  },
];
