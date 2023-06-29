import React from "react";

import { Stat, StatProps } from "./Stat";

interface StatBarProps {
  /** array of stat props*/
  stats: StatProps[];
  className: string;
  handleClick: (stat: StatProps) => void;
}

export const StatBar = ({ stats, className, handleClick }: StatBarProps) => (
  <div className={className}>
    <h3 className="text-base font-semibold leading-6 text-gray-900">
      Last 30 days
    </h3>
    <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
      {stats.map((stat) => (
        <Stat
          key={stat.name}
          {...stat}
          handleClick={() => {
            handleClick(stat);
          }}
        />
      ))}
    </dl>
  </div>
);
