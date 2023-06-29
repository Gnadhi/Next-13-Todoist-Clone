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
  const selectedFrameworkId = searchParams.get("selectedFrameworkId");

  if (selectedFrameworkId == null)
    return new Response("Not valid param", {
      status: 400,
      statusText: "selectedFrameworkId not provided",
    });

  const session = await getServerSession(authOptions);

  if (session == null)
    return new Response("Unauthorised", {
      status: 401,
      statusText: "User is not authoirsed",
    });

  if (session.user?.email == null)
    return new Response("Unauthorised", {
      status: 401,
      statusText: "User is not authoirsed",
    });

  const userData = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      company: true,
    },
  });

  const doesFrameworkExist = await prisma.framework.count({
    where: {
      id: selectedFrameworkId,
      companies: {
        some: {
          id: userData?.companyId,
        },
      },
    },
  });

  if (doesFrameworkExist) {
    await prisma.framework.update({
      where: {
        id: selectedFrameworkId,
      },
      data: {
        companies: {
          disconnect: {
            id: userData?.companyId,
          },
        },
      },
    });
  } else {
    await prisma.framework.update({
      where: {
        id: selectedFrameworkId,
      },
      data: {
        companies: {
          connect: {
            id: userData?.companyId,
          },
        },
      },
    });
  }
}
