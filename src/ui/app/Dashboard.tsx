import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const userData = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: userData!.user!.email!,
    },
    select: {
      companyId: true,
    },
  });

  const issues = await prisma.issue.findMany({
    where: {
      companyId: user?.companyId,
    },
    include: {
      Integration: {
        include: {
          selectedIngration: true,
        },
      },
    },
  });

  const issueCount = issues.length;
  const highRiskCount = issues.filter((issue) => issue.risk === "high").length;
  const lowRiskCount = issues.filter((issue) => issue.risk === "low").length;

  return (
    //TODO: Refactor details section to separate component
    // TODO: Need a component for component list
    <>
      {/* Stats */}
      <div>
        <div>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                All Issues
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {issueCount}
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                High Risk Issues
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {highRiskCount}
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                Low Risk Issues
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {lowRiskCount}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {/* Table */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Problem
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Risk
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Frameworks
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Integration
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium capitalize text-gray-900">
                              {issue.name}
                            </div>
                            <div className="mt-1 capitalize text-gray-500">
                              {issue.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm capitalize text-gray-500">
                        <div className="text-gray-900">{issue.risk}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {issue.frameworks.map((framework, indx) => (
                          <span
                            className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium capitalize text-green-700 ring-1 ring-inset ring-green-600/20"
                            key={indx}
                          >
                            {framework}
                          </span>
                        ))}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                          {issue.Integration?.selectedIngration.name}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
