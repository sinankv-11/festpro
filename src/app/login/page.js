"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, User } from "lucide-react"

export default function LoginPage() {

    const router = useRouter()

    const [username, setUsername] =
        useState("")

    const [password, setPassword] =
        useState("")

    const [loading, setLoading] =
        useState(false)

    const [error, setError] =
        useState("")

    const login = async () => {

        try {

            setLoading(true)
            setError("")

            const organizationCode =
                localStorage.getItem(
                    "organizationCode"
                )

            const res = await fetch(
                "https://festpro.onrender.com/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({

                        organizationCode,

                        username,

                        password,

                    }),

                }
            )

            const data =
                await res.json()

            if (!res.ok) {

                setError(
                    data.message ||
                    "Login Failed"
                )

                return

            }

            localStorage.setItem(
                "token",
                data.token
            )

            localStorage.setItem(
                "username",
                data.username
            )

            router.push("/admin")

        } catch (err) {

            console.log(err)

            setError(
                "Server Connection Failed"
            )

        } finally {

            setLoading(false)

        }

    }

    return (

        <div className="min-h-screen bg-black flex items-center justify-center p-6">

            {/* BACKGROUND */}

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />

            {/* CARD */}

            <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] p-8 shadow-2xl">

                {/* LOGO */}

                <div className="text-center mb-8">

                    <div className="w-24 h-24 mx-auto rounded-[30px] bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center mb-5">

                        <ShieldCheck
                            size={45}
                            className="text-black"
                        />

                    </div>

                    <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

                        FestPro

                    </h1>

                    <p className="text-gray-400 mt-3">

                        Admin Login
                    </p>

                </div>

                {/* ERROR */}

                {error && (

                    <div className="mb-5 bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-2xl">

                        {error}

                    </div>

                )}


                <div className="mb-5">

  <label className="text-gray-400 block mb-2">

    Organization Code

  </label>

  <input
    value={
      typeof window !== "undefined"
        ? localStorage.getItem(
            "organizationCode"
          ) || ""
        : ""
    }
    readOnly
    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-gray-400"
  />

</div>

                {/* USERNAME */}

                <div className="mb-5">

                    <label className="text-gray-400 block mb-2">

                        Username

                    </label>

                    <div className="flex items-center bg-black/40 border border-white/10 rounded-2xl px-4">

                        <User
                            size={18}
                            className="text-gray-500"
                        />

                        <input
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                            placeholder="Enter username"
                            className="bg-transparent outline-none p-4 w-full text-white"
                        />

                    </div>

                </div>

                {/* PASSWORD */}

                <div className="mb-8">

                    <label className="text-gray-400 block mb-2">

                        Password

                    </label>

                    <div className="flex items-center bg-black/40 border border-white/10 rounded-2xl px-4">

                        <Lock
                            size={18}
                            className="text-gray-500"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Enter password"
                            className="bg-transparent outline-none p-4 w-full text-white"
                        />

                    </div>

                </div>

                {/* BUTTON */}

                <button
                    onClick={login}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black py-4 rounded-2xl hover:scale-[1.02] transition-all"
                >

                    {loading
                        ? "Logging in..."
                        : "Login"}

                </button>

                {/* FOOTER */}

                <div className="text-center mt-6">

                    <p className="text-gray-500 text-sm">

                        Fest Manager Administration

                    </p>

                </div>

            </div>

        </div>

    )
}