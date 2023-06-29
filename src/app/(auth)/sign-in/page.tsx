import Image from "next/image";

import logo from "@/../public/logo.png";
import { BackButton } from "@/ui/Button";
import { AuthForm } from "@/ui/auth/AuthForm";

export default function SignIn() {
  return (
    <>
      <BackButton className="fixed left-4 top-4 flex items-center rounded p-2 font-semibold text-slate-900 transition-colors duration-150 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/50 md:left-12 md:top-12" />
      <div className="flex min-h-full">
        <div className="flex w-full flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-md rounded-lg p-6">
            <div>
              <Image
                className="mx-auto h-20 w-auto"
                src={logo}
                alt="Company Lgo"
              />
              <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900 ">
                Sign In
              </h1>
              <p className="mt-2 text-center text-sm text-slate-700">
                No Account? No Problem. <br />
                <a
                  href="#"
                  className="font-medium text-slate-400 underline underline-offset-4 hover:text-indigo-500"
                >
                  Check out how your company can get started for free
                </a>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <AuthForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
