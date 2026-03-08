'use client'
import Image from "next/image";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions-customer";
import Link from "next/link";

export default function Loginform() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    return (
        <div className="flex  items-center justify-center px-6 py-24">
            <div className="w-full max-w-md rounded-2xl border  bg-white shadow-xl p-8">
                <div className="text-center">
                    <Image  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" width={100} height={100} className="mx-auto h-12" alt="Company logo"/>

                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm">
                        Welcome back 👋
                    </p>
                </div>

                <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium  text-gray-700 hover:bg-gray-50 transition" >
                    <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} className="h-5 w-5"/>
                    Sign in with Google
                </button>

                <div className="flex items-center gap-3 my-6">
                    <div className="h-px flex-1 bg-gray-300"></div>
                    <span className="text-gray-500 text-sm">
                        or continue with
                    </span>
                    <div className="h-px flex-1 bg-gray-300"></div>
                </div>

                {/* Form */}
                <form className="space-y-5" action={formAction}>
                    <div>
                        <label className="text-sm text-gray-700"> Email address </label>
                        <input type="email" id="email-id" name="email" required  className="mt-2 w-full rounded-xl border border-gray-300  px-4 py-3 text-gray-900 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm">
                            <label className="text-gray-700">
                                Password
                            </label>
                            <a className="text-indigo-500 hover:text-indigo-600">
                                Forgot password?
                            </a>
                        </div>

                        <input type="password" id="password-id" name="password"  required  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <button  type="submit" disabled={isPending} className="w-full flex justify-center items-center  bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300" >
                        Sign in
                    </button>
                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Not a member?{" "}
                    <Link href={'/register'} className="font-semibold text-indigo-500 hover:text-indigo-600">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}

