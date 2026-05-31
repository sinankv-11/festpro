"use client"
import {
    useState,
    useEffect,
} from "react"


export default function SuperAdminPage() {

    const [name, setName] =
        useState("")

    const [code, setCode] =
        useState("")

    const [adminUsername,
        setAdminUsername] =
        useState("")

    const [adminPassword,
        setAdminPassword] =
        useState("")

    const [organizations,
        setOrganizations] =
        useState([])

    useEffect(() => {

        fetchOrganizations()

    }, [])

    const fetchOrganizations =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/organizations"
                    )

                const data =
                    await res.json()

                setOrganizations(data)

            } catch (err) {

                console.log(err)

            }

        }

    const createOrganization =
        async () => {

            try {

                await fetch(
                    "http://localhost:5000/organizations",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({

                            name,
                            code,

                            adminUsername,
                            adminPassword,

                        })
                    }
                )

                alert(
                    "Organization Created"
                )

                setName("")
                setCode("")
                fetchOrganizations()

            } catch (err) {

                console.log(err)

            }

        }

    const deleteOrganization =
        async (id) => {

            try {

                await fetch(
                    `http://localhost:5000/organizations/${id}`,
                    {
                        method: "DELETE",
                    }
                )

                fetchOrganizations()

            } catch (err) {

                console.log(err)

            }

        }

    return (

        <div className="min-h-screen bg-black text-white p-10">

            <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-[35px] p-8">

                <h1 className="text-4xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

                    Super Admin

                </h1>

                <div className="space-y-5">

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        placeholder="Organization Name"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5"
                    />

                    <input
                        value={code}
                        onChange={(e) =>
                            setCode(
                                e.target.value
                            )
                        }
                        placeholder="Organization Code"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5"
                    />

                    <input
                        value={adminUsername}
                        onChange={(e) =>
                            setAdminUsername(
                                e.target.value
                            )
                        }
                        placeholder="Admin Username"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5"
                    />

                    <input
                        value={adminPassword}
                        onChange={(e) =>
                            setAdminPassword(
                                e.target.value
                            )
                        }
                        placeholder="Admin Password"
                        type="password"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5"
                    />

                    <button
                        onClick={
                            createOrganization
                        }
                        className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold py-4 rounded-2xl"
                    >

                        Create Organization

                    </button>

                </div>

            </div>

            <div className="max-w-4xl mx-auto mt-10 bg-white/5 border border-white/10 rounded-[35px] overflow-hidden">

                <table className="w-full">

                    <thead className="bg-black/40">

                        <tr>

                            <th className="p-5 text-left">
                                Name
                            </th>

                            <th className="p-5 text-left">
                                Code
                            </th>

                            <th className="p-5 text-left">
                                Status
                            </th>

                            <th className="p-5 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {organizations.map(
                            (org) => (

                                <tr
                                    key={org._id}
                                    className="border-t border-white/10"
                                >

                                    <td className="p-5">
                                        {org.name}
                                    </td>

                                    <td className="p-5">
                                        {org.code}
                                    </td>

                                    <td className="p-5">

                                        {org.active
                                            ? "Active"
                                            : "Inactive"}

                                    </td>

                                    <td className="p-5">

                                        <button
                                            onClick={() =>
                                                deleteOrganization(
                                                    org._id
                                                )
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold"
                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    )
}