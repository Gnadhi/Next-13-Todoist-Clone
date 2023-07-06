"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

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
