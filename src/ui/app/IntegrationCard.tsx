import Image from "next/image";

import Badge from "./Badge";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

type IntegrationCardProps = {
  name: string;
  imgUrl: string;
};

const IntegrationCard = ({ name, imgUrl }: IntegrationCardProps) => (
  <div className="flex flex-col divide-y divide-gray-200 rounded-lg bg-slate-100 shadow-md">
    <div>
      <div className="flex items-center justify-between p-4">
        <Image
          src={imgUrl}
          alt="Logo"
          className="h-8 w-8"
          width={80}
          height={80}
        />
        <Badge label="connected" />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4">
        <h3 className="text-lg font-semibold tracking-wide text-slate-900">
          {name}
        </h3>
      </div>
    </div>
    <div>
      <div className="-mt-px flex">
        <div className="relative inline-flex w-0 flex-1 items-center justify-center  space-x-1 rounded-b-lg border border-transparent py-2 text-sm font-semibold text-gray-900 hover:cursor-pointer hover:bg-slate-200 ">
          <Cog6ToothIcon className="h-4 w-4 text-black" aria-hidden="true" />
          <p>Settings</p>
        </div>
      </div>
    </div>
  </div>
);

export default IntegrationCard;
