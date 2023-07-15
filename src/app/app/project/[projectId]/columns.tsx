"use client";

import { updateTodoForUser } from "./actions";
import { Checkbox } from "@/components/ui/checkbox";
import { TodoItem } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";

//TOOD: Fix later to use zod correctly
export const columns: ColumnDef<TodoItem>[] = [
  {
    accessorKey: "isCompleted",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getValue("isCompleted")}
        onCheckedChange={() => {
          updateTodoForUser(row.original.id, {
            isCompleted: !row.getValue("isCompleted"),
          });
        }}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
  },
  {
    accessorKey: "description",
    cell: ({ cell }) => <>{cell.getValue()}</>,
  },
  {
    accessorKey: "dueDate",
    cell: ({ row }) => (
      <>
        {formatDistanceToNow(row.getValue("dueDate"), {
          addSuffix: true,
        })}
      </>
    ),
  },
];
