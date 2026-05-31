"use client"

import Link from "next/link"

export default function HomePage() {

  const code =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "organizationCode"
        )
      : ""

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-[35px] p-10">

        <h1 className="text-5xl font-black text-center mb-3">

          {code}
        </h1>

        <p className="text-center text-gray-400 mb-10">

          Select View
        </p>

        <div className="space-y-5">

          <Link
            href="/student"
            className="block text-center bg-cyan-400 text-black py-5 rounded-2xl font-bold"
          >

            Student View

          </Link>

          <Link
            href="/login"
            className="block text-center bg-purple-500 text-black py-5 rounded-2xl font-bold"
          >

            Admin Login

          </Link>

        </div>

      </div>

    </div>

  )
}