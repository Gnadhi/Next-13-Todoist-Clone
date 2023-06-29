"use client";

import { Fragment, useEffect, useState } from "react";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";

/* eslint-disable @next/next/no-img-element */

const navigation = [
  {
    name: "Dashboard",
    href: "/app",
    icon: HomeIcon,
  },
  { name: "Frameworks", href: "/app/frameworks", icon: SquaresPlusIcon },
  { name: "Integrations", href: "/app/integrations", icon: RectangleGroupIcon },
];

type NavbarProps = {
  userId: string;
};

/**
 * This is the appliations sidebr
 */
export default function Navbar({ userId }: NavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/account/get-user?userId=${userId}`)
      .then((res) => res.json())
      .then((res) => setUser(res));
  }, [userId]);

  const userImgUrl: string =
    user?.imgUrl ??
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  // const user = {
  //   name: "hello",
  //   email: "something",
  //   imgUrl:
  //     "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  // };

  const currentPath = usePathname();

  // Checks if sub path matches the first part of the path
  // e.g. app/dashboard should match app/dashboard/one
  const isActive = (href: string) => {
    //Exception for just the default path /app
    if (href === "/app") return href === currentPath;

    return currentPath.startsWith(href);
  };
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center ">
                    <Image
                      className="h-8 w-auto"
                      src="/logo.png"
                      alt="Your Company"
                      width="50"
                      height="50"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={clsx(
                                  isActive(item.href)
                                    ? "bg-slate-400 text-indigo-600"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <item.icon
                                  className={clsx(
                                    isActive(item.href)
                                      ? "text-black"
                                      : "text-gray-400 group-hover:text-indigo-600",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-slate-900 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <Image
              className="h-10 w-auto"
              src="/logo-white.png"
              alt="Your Company"
              width="50"
              height="50"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-10">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={clsx(
                          isActive(item.href)
                            ? "bg-white text-slate-900"
                            : "text-white hover:bg-white hover:text-slate-900",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon
                          className={clsx(
                            isActive(item.href)
                              ? "text-slate-900"
                              : "text-white group-hover:text-slate-900",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <a
                  href="/app/account"
                  className={clsx(
                    isActive("/app/account")
                      ? "bg-white text-slate-900"
                      : "border border-white text-white hover:bg-white hover:text-slate-900",
                    "m-4 flex items-center gap-x-4 rounded-md border-white px-6 py-3 text-sm font-semibold leading-6 "
                  )}
                >
                  <Image
                    className="h-8 w-8 rounded-full border border-black bg-gray-50"
                    src={userImgUrl}
                    alt=""
                    width="50"
                    height="50"
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{user?.name ?? "John"}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white p-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Dashboard
        </div>
        <a href="#">
          <span className="sr-only">Your profile</span>
          <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src={userImgUrl}
            alt=""
          />
        </a>
      </div>
    </>
  );
}
