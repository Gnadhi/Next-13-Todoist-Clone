import { createNewProjectForUser } from "./actions";
import ProjectSwitcher from "@/components/project-switcher";
import { Search } from "@/components/search";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

async function getProjectsForUser(userId: string) {
  return await prisma.project.findMany({
    where: {
      userId,
    },
  });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // TODO: Add a redirect if user is not logged in
  const projects = await getProjectsForUser(user?.id as string);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <ProjectSwitcher
              projects={projects}
              onNewProjectCreate={createNewProjectForUser}
            />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      {JSON.stringify(projects)}
      {children}
    </>
  );
}
