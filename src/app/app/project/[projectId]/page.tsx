import { redirect } from "next/navigation";

import { columns } from "./columns";
import { DataTable } from "@/app/todo/data-table";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const revalidate = 0;

// Displays the todos for the project
async function getTodosForProject(userId: string, projectId: string) {
  return await prisma.todoItem.findMany({
    where: {
      project: {
        userId,
      },
    },
  });
}

export default async function Page({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  const todos = await getTodosForProject(user.id, projectId);

  return (
    <>
      {JSON.stringify(todos)}
      <DataTable columns={columns} data={todos} />
    </>
  );
}
