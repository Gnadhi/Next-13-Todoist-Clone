import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session!.user!.email!,
    },
    include: {
      company: {
        select: {
          domain: true,
          name: true,
        },
      },
    },
  });

  const obj = { ...session, user };

  return <pre>{JSON.stringify(obj, null, 2)}</pre>;
}
