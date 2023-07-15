"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

// TODO: Cant have responses in server actions need to figure out what else todo
export async function createNewProjectForUser(projectName: string) {
  "use server";

  const user = await getCurrentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  await prisma.project.create({
    data: {
      name: projectName,
      userId: user.id,
    },
  });
}

export async function updateTodoForUser(
  todoId: string,
  {
    isCompleted,
  }: {
    isCompleted: boolean;
  }
) {
  "use server";

  const user = await getCurrentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    await prisma.todoItem.update({
      where: {
        id: todoId,
      },
      data: {
        isCompleted: isCompleted,
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(error as string, { status: 500 });
  }
}
