"use client";

import { updateTodoForUser } from "./actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Priority, TodoItem } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { Flag } from "lucide-react";

export const columns: ColumnDef<TodoItem>[] = [
  {
    header: () => <></>,
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
        className="translate-y-[2px] h-6 w-6 rounded-full"
      />
    ),
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Priority",
    accessorKey: "priority",
    cell: ({ row }) => {
      switch (row.getValue("priority")) {
        case Priority.HIGH:
          return <>High</>;
        case Priority.MEDIUM:
          return <>Medium</>;
        case Priority.LOW:
          return <>Low</>;
        default:
          return <>None</>;
      }
    },
  },
  {
    header: "Due Date",
    accessorKey: "dueDate",
    cell: ({ row }) => {
      return formatDistanceToNow(row.getValue("dueDate"), {
        addSuffix: true,
      });
    },
  },
];
