"use client";

import { useRouter } from "next/navigation";

/* eslint-disable @next/next/no-img-element */

type SelectIntegrationGridProps = {
  integrationOptions: {
    id: string;
    name: string;
    description: string;
    imgUrl: string;
  }[];
};
const SelectIntegrationGrid = ({
  integrationOptions,
}: SelectIntegrationGridProps) => {
  const router = useRouter();

  const addIntegration = async (integrationId: string) => {
    //TODO: add some sort of loading indication here before the redirect happens
    await fetch(`/api/add-integration/?selectedInegrationId=${integrationId}`, {
      method: "POST",
    });
    router.replace("/app/integrations");
  };

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {integrationOptions.map((integration) => (
        <li
          key={integration.id}
          className="relative"
          onClick={() => addIntegration(integration.id)}
        >
          <div className="group flex h-40 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 hover:cursor-pointer">
            <span className="absolute right-2 top-1 mt-1 rounded-lg bg-slate-700 px-2 py-1 text-xs capitalize text-white">
              {integration.description}
            </span>
            <img
              src={integration.imgUrl}
              alt={integration.name}
              className="pointer-events-none my-2 mt-6 h-20 w-20 object-contain group-hover:opacity-75"
            />
            <div className="text-lg font-semibold text-slate-700">
              {integration.name}
            </div>
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">
                View details for {integration.name}
              </span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SelectIntegrationGrid;
