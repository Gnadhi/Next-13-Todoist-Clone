"use client";

import { usePathname } from "next/navigation";

type AccountHeaderProps = {
  navItems: Array<{ name: string; href: string }>;
};

export default function AccountHeader({ navItems }: AccountHeaderProps) {
  const currentPath = usePathname();
  return (
    <header className="border-b border-black/50">
      <nav className="flex overflow-x-auto py-4">
        <ul
          role="list"
          className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
        >
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={currentPath === item.href ? "text-slate-800" : ""}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
