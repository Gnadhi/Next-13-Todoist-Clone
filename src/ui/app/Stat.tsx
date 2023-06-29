import React, { useContext } from "react";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";

export interface StatProps {
  /**
   * The current value of the stat
   */
  val: number;
  /**
   * The previous value of the stat
   */
  prevVal: number;
  /**
   * The name of the stat
   */
  name: string;

  handleClick?: () => void;
}

export const Stat = ({ val, prevVal, name, handleClick }: StatProps) => {
  const change: number = ((val - prevVal) / prevVal) * 100;

  return (
    <div
      className="group px-4 py-5 hover:cursor-pointer hover:bg-gray-900  hover:drop-shadow-md sm:p-6"
      onClick={handleClick}
    >
      <dt className="text-base font-medium text-gray-900 group-hover:font-medium group-hover:text-gray-300">
        {name + " "}
      </dt>
      <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div className="flex items-baseline text-2xl font-semibold text-indigo-600 group-hover:text-indigo-200">
          {val}
          <span className="ml-2 text-sm font-medium text-gray-500 group-hover:text-gray-500">
            out of {prevVal}
          </span>
        </div>

        {change !== 0 ? (
          <div
            className={[
              change > 0
                ? "bg-green-100 group-hover:bg-green-50 text-green-800 "
                : "bg-red-100 group-hover:bg-red-200 text-red-500 group-hover:text-red-700",
              "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0",
            ].join(" ")}
          >
            {change > 0 ? (
              <ArrowUpIcon
                className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-green-500"
                aria-hidden="true"
              />
            ) : (
              <ArrowDownIcon
                className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-red-500 group-hover:text-red-700"
                aria-hidden="true"
              />
            )}
            {change}%
          </div>
        ) : (
          <CheckCircleIcon
            className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-green-500 group-hover:text-green-400"
            aria-hidden="true"
          />
        )}
      </dd>
    </div>
  );
};
