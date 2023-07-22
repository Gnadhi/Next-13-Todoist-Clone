import { redirect } from "next/navigation";

import { Search } from "@/components/search";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserNav } from "@/components/user-nav";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { Menu, Plus } from "lucide-react";

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
        <TooltipProvider>
          <div className="flex h-16 items-center px-4">
            <Tooltip>
              <TooltipTrigger asChild disabled>
                <Menu
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  className="mr-2 h-6 w-6"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p> Not yet implemented </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Search disabled />
              </TooltipTrigger>
              <TooltipContent>
                <p> Not yet implemented </p>
              </TooltipContent>
            </Tooltip>
            <div className="ml-auto flex items-center space-x-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={"outline"}>
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p> New Todo </p>
                </TooltipContent>
              </Tooltip>

              <ThemeToggle />
              <UserNav />
            </div>
          </div>
          <div className="grid md:grid-cols-4 lg:grid-cols-5">
            <Sidebar className="hidden md:block" projects={projects} />
            <div className="col-span-3 lg:col-span-4">{children}</div>
          </div>
        </TooltipProvider>
      </div>
    </>
  );
}
