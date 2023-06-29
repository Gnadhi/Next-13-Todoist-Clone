import { NextRequest, NextResponse } from "next/server";

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
  const id = searchParams.get("id");
  return NextResponse.json({ id });
}
