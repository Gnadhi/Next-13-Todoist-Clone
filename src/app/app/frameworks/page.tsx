import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FrameworkGrid from "@/ui/app/FrameworkGrid";
import Heading from "@/ui/app/Heading";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth/next";

async function getFrameworks() {
  //NOTE:Not the best way to do this you should try using next auth along with some sort of custom adapter !
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: session!.user!.email!,
    },
    select: {
      email: true,
      name: true,
      company: {
        select: {
          id: true,
        },
      },
    },
  });

  const addedFrameworks = await prisma.framework.findMany({
    where: {
      companies: {
        some: {
          id: user!.company!.id,
        },
      },
    },
  });

  const remainingFrameworks = await prisma.framework.findMany({
    where: {
      NOT: {
        companies: {
          some: {
            id: user!.company!.id,
          },
        },
      },
    },
  });

  return [addedFrameworks, remainingFrameworks];
}

export default async function FrameworksPage() {
  const [companyFrameworks, availableFrameworks] = await getFrameworks();

  return (
    <>
      <Heading title="Frameworks" />
      <div className="my-6">
        <div className="mb-5 rounded-md bg-slate-900 p-5 text-white">
          <h2 className="pb-2 text-xl font-bold">Active Frameworks</h2>
          <FrameworkGrid frameworks={companyFrameworks} />
        </div>
        <div>
          <h2 className="pb-2 text-xl font-bold">Available Frameworks</h2>
          <FrameworkGrid frameworks={availableFrameworks} />
        </div>
      </div>
    </>
  );
}
