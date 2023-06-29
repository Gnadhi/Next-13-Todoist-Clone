/* eslint-disable @next/next/no-img-element */
import { ToggleFramework } from "./ToggleFramework";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Badge from "@/ui/app/Badge";
import Heading from "@/ui/app/Heading";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";

export default async function FrameworkPage({
  params: { frameworkId },
}: {
  params: {
    frameworkId: string;
  };
}) {
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

  const companyId = user?.company.id;

  const framework = await prisma.framework.findUnique({
    where: {
      id: frameworkId,
    },
    include: {
      companies: {
        where: {
          id: companyId,
        },
      },
      policies: {
        include: {
          controls: true,
        },
      },
    },
  });

  // This boolean will tell you if the framework is in the users company or not
  const isFrameworkAdded = framework?.companies.length !== 0;

  return (
    framework && (
      <>
        <Heading
          showNavBack
          title={framework.name}
          rightCompoenet={
            isFrameworkAdded ? (
              <ToggleFramework
                frameworkId={frameworkId}
                isFrameworkActive={false}
              />
            ) : (
              <ToggleFramework
                frameworkId={frameworkId}
                isFrameworkActive={true}
              />
            )
          }
        />
        <div className="my-6">
          <div>
            <div className="flex items-center justify-start">
              <img
                src={framework.imgUrl}
                alt={framework.name}
                className="pointer-events-none my-2 mt-6 h-20 w-20 object-contain group-hover:opacity-75"
              />
              <div className="px-4 sm:px-8">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  {framework.name} Info
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Description of {framework.name} and its controls
                </p>
                <div>
                  {isFrameworkAdded ? (
                    <Badge label="Active" />
                  ) : (
                    <span className="inline-flex items-center rounded bg-slate-700 px-2 py-0.5 text-sm font-medium text-white">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Status
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {framework.description}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Offical URL
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {framework.url}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Policies
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul
                      role="list"
                      className="divide-y divide-gray-100 rounded-md border border-gray-200"
                    >
                      {framework.policies.map((policy) => (
                        <li
                          className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                          key={policy.id}
                        >
                          <div className="flex w-0 flex-1 items-center">
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">
                                {policy.name}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </>
    )
  );
}
