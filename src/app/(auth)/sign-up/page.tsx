/* eslint-disable @next/next/no-img-element */
import { AuthForm } from "@/ui/auth/AuthForm";

export default function SignUp() {
  return (
    <>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          {/*TODO: change this for a custom width class thats bigger than 96 pixels */}
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="mx-auto h-20 w-auto"
                src="./logo.png"
                alt="Company Lgo"
              />
              <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900 ">
                Sign Up
              </h1>
              <p className="mt-2 text-center text-sm text-slate-700">
                <a
                  href="#"
                  className="font-medium text-slate-400 underline underline-offset-4 hover:text-indigo-500"
                >
                  Already have a account? Login In.
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
        {/*TODO: Add a image on the right that shows the value of the application */}
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
