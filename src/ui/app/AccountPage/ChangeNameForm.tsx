"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { User } from "@/app/app/NavigationLayout";
import { SubmitButton } from "@/ui/Button";

export default function ChangeNameForm({ userId }: { userId: string | null }) {
  const [user, setUser] = useState<User & { imgUrl: string }>();
  useEffect(() => {
    fetch(`/api/account/get-user?userId=${userId}`)
      .then((res) => res.json())
      .then((res) => setUser(res));
  }, [userId]);

  const [name, setName] = useState(user?.name);
  const userImgUrl =
    user?.imgUrl ??
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <form className="md:col-span-2">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full flex items-center gap-x-8">
          <Image
            src={userImgUrl}
            alt=""
            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-contain"
            width={96}
            height={96}
          />
          <div>
            <button
              type="button"
              className="rounded-md border bg-white/5 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-black/10"
            >
              Change avatar
            </button>
            <p className="mt-2 text-xs leading-5 text-gray-400">
              JPG, GIF or PNG. 1MB max.
            </p>
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 "
          >
            Username
          </label>
          <div className="mt-2">
            <div className="flex rounded-md border border-gray-400 bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="flex-1 border-0 bg-transparent py-1.5 pl-1  focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-24">
        <SubmitButton
          variant="primary"
          url={`/api/account?userId=${userId}&newName=${name}`}
          method="POST"
        >
          Save
        </SubmitButton>
      </div>
    </form>
  );
}
