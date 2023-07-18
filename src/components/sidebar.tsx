import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Project } from "@prisma/client";
import { CircleIcon, InboxIcon, PlusCircleIcon } from "lucide-react";

type SidebarProps = {
  projects: Project[];
  className?: string;
};
export function Sidebar({ projects, className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 p2-4">
        <div className="px-3">
          {/* 
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2> */}
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <InboxIcon
                strokeWidth={2}
                viewBox="0 0 24 24"
                className="mr-2 h-4 w-4"
              />
              Inbox
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Projects
          </h2>
          <div className="space-y-1">
            {projects.map(({ name }) => (
              <Button variant="ghost" className="w-full justify-start">
                <CircleIcon
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  className="mr-2 h-4 w-4"
                />
                {name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
