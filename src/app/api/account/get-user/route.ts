import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session === null)
    return new Response("Unauthorised", {
      status: 401,
      statusText: "User is not authoirsed",
    });

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Bad Request", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId!,
    },
    select: {
      name: true,
      email: true,
      imgUrl: true,
    },
  });

  return NextResponse.json(user);
}
