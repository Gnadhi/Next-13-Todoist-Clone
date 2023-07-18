import { redirect } from "next/navigation";

import { Search } from "@/components/search";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { Menu, MenuSquare } from "lucide-react";

export const revalidate = 0;

async function getProjectsForUser(userId: string) {
  return await prisma.project.findMany({
    where: {
      userId,
    },
  });
}

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  const projects = await getProjectsForUser(user.id);

  return (
    <>
      {modal}
      <div>
        <div className="flex h-16 items-center px-4">
          <Menu strokeWidth={2} viewBox="0 0 24 24" className="mr-2 h-6 w-6" />
          <Search />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
        <div className="grid md:grid-cols-4 lg:grid-cols-5">
          <Sidebar className="hidden md:block" projects={projects} />
          <div className="col-span-3 lg:col-span-4">{children}</div>
        </div>
      </div>
    </>
  );
}
