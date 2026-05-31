"use client"

import { useEffect, useState } from "react"

import {

  Shapes,

  Plus,

  Pencil,

  Trash2,

} from "lucide-react"



export default function TypesPage() {



  const [typeName, setTypeName] =
    useState("")

  const [types, setTypes] =
    useState([])

  const [editingId, setEditingId] =
    useState(null)



  // FETCH
  const fetchTypes = async () => {

    try {

      const organizationCode =
        localStorage.getItem(
          "organizationCode"
        )

      const res = await fetch(
        `https://festpro.onrender.com/types?organizationCode=${organizationCode}`
      )

      const data = await res.json()

      setTypes(

        Array.isArray(data)
          ? data
          : []

      )

    } catch (err) {

      console.log(err)

    }

  }



  useEffect(() => {

    fetchTypes()

  }, [])



  // RESET
  const resetForm = () => {

    setTypeName("")
    setEditingId(null)

  }



  // ADD
  const addType = async () => {

    try {

      await fetch(

        "https://festpro.onrender.com/types",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            organizationCode:
              localStorage.getItem(
                "organizationCode"
              ),

            typeName,

          }),

        }

      )



      resetForm()

      fetchTypes()

    } catch (err) {

      console.log(err)

    }

  }



  // UPDATE
  const updateType = async () => {

    try {

      await fetch(

        `https://festpro.onrender.com/types/${editingId}`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            typeName,

          }),

        }

      )



      resetForm()

      fetchTypes()

    } catch (err) {

      console.log(err)

    }

  }



  // DELETE
  const deleteType = async (id) => {

    try {

      await fetch(

        `https://festpro.onrender.com/types/${id}`,

        {

          method: "DELETE",

        }

      )



      fetchTypes()

    } catch (err) {

      console.log(err)

    }

  }



  return (

    <div className="space-y-10">



      {/* HEADER */}

      <div className="flex items-center justify-between flex-wrap gap-5">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-3">

            Types

          </h1>



          <p className="text-gray-400 text-lg">

            Manage program types

          </p>

        </div>



        <div className="w-20 h-20 rounded-3xl bg-green-400/10 flex items-center justify-center border border-green-400/20">

          <Shapes
            size={38}
            className="text-green-400"
          />

        </div>

      </div>



      {/* FORM */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] p-8 shadow-2xl">



        <div className="grid md:grid-cols-[1fr_auto] gap-5">



          <input
            value={typeName}
            onChange={(e) =>
              setTypeName(
                e.target.value
              )
            }
            placeholder="Enter type name"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-green-400 text-lg"
          />



          <button
            onClick={
              editingId
                ? updateType
                : addType
            }
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold px-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 justify-center"
          >

            <Plus size={22} />

            {editingId
              ? "Update Type"
              : "Add Type"}

          </button>

        </div>

      </div>



      {/* TABLE */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] overflow-hidden shadow-2xl">



        <div className="overflow-x-auto">

          <table className="w-full">



            <thead className="bg-black/40 border-b border-white/10">

              <tr>

                <th className="p-6 text-left text-gray-300">

                  Type Name

                </th>



                <th className="p-6 text-left text-gray-300">

                  Actions

                </th>

              </tr>

            </thead>



            <tbody>

              {types.map((type) => (

                <tr
                  key={type._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >

                  <td className="p-6">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-green-400/10 flex items-center justify-center">

                        <Shapes
                          size={20}
                          className="text-green-400"
                        />

                      </div>



                      <span className="text-xl font-semibold">

                        {type.typeName}

                      </span>

                    </div>

                  </td>



                  <td className="p-6">

                    <div className="flex gap-3">



                      <button
                        onClick={() => {

                          setEditingId(
                            type._id
                          )

                          setTypeName(
                            type.typeName
                          )

                        }}
                        className="bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-2"
                      >

                        <Pencil size={18} />

                        Edit

                      </button>



                      <button
                        onClick={() =>
                          deleteType(type._id)
                        }
                        className="bg-red-500 text-white px-5 py-3 rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-2"
                      >

                        <Trash2 size={18} />

                        Delete

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}