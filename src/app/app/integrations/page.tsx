import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/ui/Button";
import Heading from "@/ui/app/Heading";
import IntegrationCard from "@/ui/app/IntegrationCard";
import { prisma } from "@/utils/prisma";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { getServerSession } from "next-auth";

export default async function IntegrationPage() {
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

  const company = await prisma.company.findUnique({
    where: {
      id: user?.company.id,
    },
    include: {
      integrations: {
        include: {
          selectedIngration: true,
        },
      },
    },
  });

  const integrations = company?.integrations;

  return (
    <>
      <Heading
        title="Integrations"
        rightCompoenet={
          <Link href="/app/integrations/add-integration">
            <Button variant="primary"> Add integration </Button>
          </Link>
        }
      />
      <div className="my-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {integrations && !!integrations.length ? (
            integrations?.map(({ id, selectedIngration }) => (
              <IntegrationCard
                key={id}
                name={selectedIngration.name}
                imgUrl={selectedIngration.imgUrl}
              />
            ))
          ) : (
            // To be rendered if no integrations have been added yet
            <Link href="/app/integrations/add-integration">
              <button
                type="button"
                className="relative block w-full rounded-lg border-2 border-dashed border-slate-300 p-12 text-center hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
              >
                <Square2StackIcon className="mx-auto h-12 w-12 text-slate-500" />
                <span className="mt-2 block text-sm font-semibold capitalize text-slate-600">
                  add new integration
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
