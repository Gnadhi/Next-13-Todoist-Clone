"use client";

import { useState, useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

/* eslint-disable @next/next/no-img-element */

type FrameworkGridProps = {
  frameworks: {
    id: string;
    name: string;
    imgUrl: string;
  }[];
};

const FrameworkGrid = ({ frameworks }: FrameworkGridProps) => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isMutating = isFetching || isPending;

  const _toggleFramework = async (frameworkId: string) => {
    setIsFetching(true);

    await fetch(`/api/toggle-framework/?selectedFrameworkId=${frameworkId}`, {
      method: "POST",
    });

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {frameworks.map((framework) => (
        <Link href={`/app/frameworks/${framework.id}`} key={framework.id}>
          <li
            style={{ opacity: !isMutating ? 1 : 0.7 }}
            key={framework.id}
            className="relative"
          >
            {" "}
            <div className="group flex h-40 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-100 shadow-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 hover:cursor-pointer">
              <img
                src={framework.imgUrl}
                alt={framework.name}
                className="pointer-events-none my-2 mt-6 h-20 w-20 object-contain group-hover:opacity-75"
              />
              <div className="text-lg font-semibold text-slate-700">
                {framework.name}
              </div>
              <button
                type="button"
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">
                  View details for {framework.name}
                </span>
              </button>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default FrameworkGrid;
