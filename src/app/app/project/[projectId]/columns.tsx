"use client";

import { TodoItem } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

//TOOD: Fix later to use zod correctly
export const columns: ColumnDef<TodoItem>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "description",
  },
  {
    accessorKey: "dueDate",
  },
];
