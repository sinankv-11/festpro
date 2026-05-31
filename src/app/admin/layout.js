"use client"

import { useState, useEffect } from "react"

import Link from "next/link"

import {
  usePathname,
  useRouter,
} from "next/navigation"

import {
  LayoutDashboard,
  Users,
  Trophy,
  FolderKanban,
  Layers3,
  ClipboardList,
  Medal,
  Shapes,
  Menu,
  X,
  LogOut,
  FileDown
} from "lucide-react"

export default function AdminLayout({
  children,
}) {

  const pathname =
    usePathname()

  const router =
    useRouter()

  const [menuOpen,
    setMenuOpen] =
    useState(false)

  useEffect(() => {

    const token =
      localStorage.getItem("token")

    if (!token) {

      router.push("/login")

    }

  }, [router])

  const logout = () => {

    localStorage.removeItem(
      "token"
    )

    localStorage.removeItem(
      "username"
    )

    router.push("/login")

  }

  const menus = [

    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },

    {
      name: "Students",
      href: "/admin/students",
      icon: Users,
    },

    {
      name: "Teams",
      href: "/admin/teams",
      icon: Trophy,
    },

    {
      name: "Categories",
      href: "/admin/categories",
      icon: FolderKanban,
    },

    {
      name: "Types",
      href: "/admin/types",
      icon: Shapes,
    },

    {
      name: "Programs",
      href: "/admin/programs",
      icon: Layers3,
    },

    {
      name: "Assignments",
      href: "/admin/assignments",
      icon: ClipboardList,
    },

    {
      name: "Results",
      href: "/admin/results",
      icon: Medal,
    },

    {
      name: "Exports",
      href: "/admin/exports",
      icon: FileDown,
    },

  ]

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* MOBILE OVERLAY */}

      {menuOpen && (

        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={() =>
            setMenuOpen(false)
          }
        />

      )}

      {/* SIDEBAR */}

      <aside
        className={`
    fixed md:sticky top-0 left-0 z-50
    w-72 h-screen
    overflow-y-auto scrollbar-thin
    bg-white/5 backdrop-blur-xl
    border-r border-white/10
    p-6 flex flex-col
    transform transition-transform duration-300

    ${menuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
          }
  `}
      >

        {/* MOBILE CLOSE */}

        <div className="flex justify-end md:hidden mb-5">

          <button
            onClick={() =>
              setMenuOpen(false)
            }
          >

            <X size={28} />

          </button>

        </div>

        {/* LOGO */}

        <div className="mb-10">

          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

            FestPro

          </h1>

          <p className="text-gray-400 mt-2">

            Admin Panel

          </p>

        </div>

        {/* MENUS */}

        <div className="flex flex-col gap-3">

          {menus.map((menu) => {

            const Icon =
              menu.icon

            const active =
              pathname ===
              menu.href

            return (

              <Link
                key={menu.name}
                href={menu.href}
                onClick={() =>
                  setMenuOpen(false)
                }
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border

                ${active

                    ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black border-transparent"

                    : "bg-white/5 border-white/10 hover:bg-white/10"

                  }`}
              >

                <Icon size={22} />

                <span className="font-semibold">

                  {menu.name}

                </span>

              </Link>

            )

          })}

        </div>

        {/* FOOTER */}

        <div className="mt-auto pt-6">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* MAIN */}

      <main className="flex-1 min-w-0">

        {/* TOPBAR */}

        <div className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setMenuOpen(true)
              }
              className="md:hidden"
            >

              <Menu size={28} />

            </button>

            <div>

              <h1 className="text-xl md:text-2xl font-bold">

                Admin Dashboard

              </h1>

              <p className="text-gray-400 text-sm">

                Manage your fest system

              </p>

            </div>

          </div>

          {/* STATUS */}

          <div className="hidden sm:flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-sm text-gray-300">

              System Online

            </span>

          </div>

        </div>

        {/* PAGE CONTENT */}

        <div className="p-4 md:p-8">

          {children}

        </div>

      </main>

    </div>

  )

}