"use client";

import { useState } from "react";

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const authFormSchema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof authFormSchema>;

export const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    signIn("email", {
      email: data.email.toLowerCase(),
      redirect: true,
      callbackUrl: "/app",
    });
    setIsLoading(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(authFormSchema),
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Email Input and labels */}
      <div>
        <label htmlFor="email" className="sr-only">
          Work Email
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            id="email"
            className={clsx(
              "block w-full rounded-md border-0 py-3 pr-10 ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
            )}
            placeholder="you@example.com"
            defaultValue="adamwathan"
            aria-invalid="true"
            aria-describedby="email-error"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="email"
            disabled={isLoading}
            formNoValidate
            {...register("email")}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {errors?.email && (
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-600"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
        {errors?.email && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-md bg-slate-900 p-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get Started
        </button>
      </div>
    </form>
  );
};
