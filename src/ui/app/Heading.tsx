"use client";

import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";

type HeadingProps = {
  /**
   * Note the title is optional so we can only display the back button or the button on the right
   */
  title?: string;
  /**
   * Optional on weather or not to show the back button on the top left of the heading compoenet above the title
   */
  showNavBack?: boolean;
  /**
   * Optional compoenet to be displayed on the right hand side of the heading
   */
  rightCompoenet?: React.ReactNode;
};

export default function Heading({
  title,
  showNavBack,
  rightCompoenet,
}: HeadingProps) {
  const router = useRouter();

  return (
    <div>
      {showNavBack && (
        <div>
          <nav className="" aria-label="Back">
            <button
              onClick={() => router.back()}
              className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-500"
            >
              <ChevronLeftIcon
                className="group-hover: -ml-1 mr-1 h-5 w-5 shrink-0 text-slate-700"
                aria-hidden="true"
              />
              Back
            </button>
          </nav>
        </div>
      )}
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          {title && (
            <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {title}
            </h2>
          )}
        </div>
        <div className="mt-4 flex shrink-0 md:ml-4 md:mt-0">
          {rightCompoenet && rightCompoenet}
        </div>
      </div>
    </div>
  );
}
