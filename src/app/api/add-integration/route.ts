import { NextRequest } from "next/server";

import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";
import { faker } from "@faker-js/faker";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const selectedInegrationId = searchParams.get("selectedInegrationId");

  if (selectedInegrationId == null)
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

  // ---- Generates fake issues -----
  // Gets selectedFramework and creates fake issues dependant on that.
  const integrationOption = await prisma.integrationOption.findUnique({
    where: {
      id: selectedInegrationId,
    },
  });

  const fakeIssues: {
    name: string;
    description: string;
    risk: string;
    frameworks: string[];
    companyId: string;
  }[] = [];

  if (integrationOption?.description === "cloud") {
    fakeIssues.push({
      name: "public bucket",
      description: "you have a bucket which is public",
      risk: "high",
      frameworks: ["gdpr"],
      companyId: userData?.companyId!,
    });
    fakeIssues.push({
      name: "open ssh port 22",
      description: "port 22 is open and exposed to the world",
      risk: "high",
      frameworks: ["cyber essentials", "soc 2", "iso 27001"],
      companyId: userData?.companyId!,
    });
    fakeIssues.push({
      name: "incorrect server location",
      description:
        "your server is located in a location that makes compling with regulations difficult",
      risk: "low",
      frameworks: ["gdpr"],
      companyId: userData?.companyId!,
    });
  } else if (integrationOption?.description === "code security") {
    fakeIssues.push({
      name: "exposed api key",
      description: "you have an api key that is eposed in one of your repos",
      risk: "low",
      frameworks: ["cyber essentials", "soc 2", "iso 27001"],
      companyId: userData?.companyId!,
    });
    fakeIssues.push({
      name: "unauthorised user in company",
      description:
        "their is a user in connected to one or more of your repos that is not in your company",
      risk: "low",
      frameworks: ["gdpr"],
      companyId: userData?.companyId!,
    });
  } else {
    fakeIssues.push({
      name: "transfer of sensitive data",
      description:
        "one of the users has transfered sensitive data oneside your company",
      risk: "high",
      frameworks: ["gdpr"],
      companyId: userData?.companyId!,
    });
    fakeIssues.push({
      name: "unauthorised user on company channels",
      description:
        "a users is in the company channels that is not a member of the organisation",
      risk: "low",
      frameworks: ["gdpr"],
      companyId: userData?.companyId!,
    });
  }

  await prisma.integration.create({
    data: {
      selectedIngrationId: selectedInegrationId,
      config: faker.datatype.json(),
      companyId: userData!.companyId,
      issues: {
        createMany: {
          data: [...fakeIssues],
        },
      },
    },
  });
}
