"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {

  const router = useRouter()

  const [code, setCode] =
    useState("")

  const continueApp = async () => {

  if (!code) return

  if (code === "SUPERADMIN") {

    router.push("/superadmin")

    return

  }

  try {

    const res =
      await fetch(
        "https://festpro.onrender.com/organizations"
      )

    const organizations =
      await res.json()

    const organization =
      organizations.find(
        (org) =>
          org.code === code
      )

    if (!organization) {

      alert(
        "Invalid Organization Code"
      )

      return

    }

    localStorage.setItem(
      "organizationCode",
      code
    )

    router.push("/home")

  } catch (err) {

    console.log(err)

    alert(
      "Server Error"
    )

  }

}

  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">

        <h1 className="text-5xl font-black text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

          FestPro

        </h1>

        <p className="text-center text-gray-400 mb-8">

          Enter Organization Code

        </p>

        <input
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
          placeholder="YOUR CODE"
          className="w-full bg-black/40 text-white placeholder-gray-500 border border-white/10 rounded-2xl p-5 outline-none mb-6"
        />

        <button
          onClick={continueApp}
          className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold py-4 rounded-2xl"
        >

          Continue

        </button>

      </div>

    </div>

  )
}