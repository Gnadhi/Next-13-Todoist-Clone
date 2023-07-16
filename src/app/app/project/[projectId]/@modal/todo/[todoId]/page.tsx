import { redirect } from "next/navigation";

import { TodoDialog } from "@/components/todo-dialog";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

async function getTodoForUser(userId: string, projectId: string) {
  return await prisma.todoItem.findFirst({
    where: {
      id: projectId,
      project: {
        userId,
      },
    },
  });
}

export default async function TodoPage({
  params: { todoId },
}: {
  params: { todoId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  const todo = await getTodoForUser(user.id, todoId);

  //TODO: Fix type error
  //@ts-ignore
  return <TodoDialog todo={todo} />;
}
