import { User } from "../NavigationLayout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChangeNameForm from "@/ui/app/AccountPage/ChangeNameForm";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";

let sessionUser: User | null = null;

async function getSessionUser(): Promise<void> {
  sessionUser = (await getServerSession(authOptions).then(
    (session) => session?.user
  )) as User;
}

export async function getUserId(sessionUser: User | null): Promise<string> {
  const x = await prisma.user.findUnique({
    where: {
      email: sessionUser?.email!,
    },
    select: {
      id: true,
      email: true,
      name: true,
      company: {
        select: {
          id: true,
        },
      },
    },
  });

  return x?.id!;
}

export default async function AccountPage() {
  await getSessionUser(); // local session populated

  return (
    <>
      <div>
        {/* Settings forms */}
        <div className="divide-y divide-black/20">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Use a permanent address where you can receive mail.{" "}
              </p>
            </div>
            <ChangeNameForm
              userId={await getUserId(sessionUser).then((userId) => userId)}
            />
          </div>
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 ">
                Delete account
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                No longer want to use our service? You can delete your account
                here. This action is not reversible. All information related to
                this account will be deleted permanently.
              </p>
            </div>

            <form className="flex items-start md:col-span-2">
              <button
                type="submit"
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-400"
              >
                Yes, delete my account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
