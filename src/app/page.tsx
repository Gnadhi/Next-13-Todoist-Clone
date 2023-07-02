import ProjectSwitcher from "@/components/project-switcher";
import { Search } from "@/components/search";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";

// Write a basic page for nextjs 13 qpp dir
const IndexPage = () => {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <ProjectSwitcher />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
