"use client";

import * as React from "react";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ProjectSwitcherProps extends PopoverTriggerProps {
  projects: Project[];
  onNewProjectCreate: (projectName: string) => void;
}

const schema = z.object({
  projectName: z
    .string()
    .min(1, { message: "Project name is required" })
    .max(24, "Projects can only be 24 characters long"),
});

export default function ProjectSwitcher({
  className,
  projects,
  onNewProjectCreate,
}: ProjectSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<Project>(
    projects[0]
  );
  const [isPending, startTransition] = React.useTransition();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedProject.id}.png`}
                alt={selectedProject.name}
                className="grayscale"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedProject.name}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              {projects.map((project) => (
                <Link key={project.id} href={`/app/project/${project.id}`}>
                  <CommandItem
                    key={project.id}
                    onSelect={() => {
                      setSelectedProject(project);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${project.id}.png`}
                        alt={project.name}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {project.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedProject.id === project.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                </Link>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewProjectDialog(true);
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create New Project
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* This is to create a new project */}
      <DialogContent>
        <form
          onSubmit={handleSubmit(({ projectName }) =>
            startTransition(() => onNewProjectCreate(projectName))
          )}
        >
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Add a new project to organise your tasks
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project</Label>
                <Input
                  id="name"
                  placeholder="Acme Inc."
                  {...register("projectName")}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewProjectDialog(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
