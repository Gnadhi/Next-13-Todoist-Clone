import { NextRequest } from "next/server";

import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session == null)
    return new Response("Unauthorised", {
      status: 401,
      statusText: "User is not authoirsed",
    });
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  console.log("==================================================")
  console.log(userId);
  const newName = searchParams.get("newName");

  if (!userId || !newName)
    return new Response("Not valid param", {
      status: 400,
      statusText: "Invalid strings passed to params",
    });

  const session = await getServerSession(authOptions);

  console.log(userId, newName);

  if (!session || !session.user || !session.user.email) {
    return new Response("Unauthorised", {
      status: 401,
      statusText: "User is not authoirsed",
    });
  } else {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: newName,
      },
    });
  }
}
