"use client"

import { useEffect, useState } from "react"

import {

  Layers3,

  Plus,

  Pencil,

  Trash2,

} from "lucide-react"



export default function ProgramsPage() {



  const [programName, setProgramName] =
    useState("")

  const [programType, setProgramType] =
    useState("")

  const [category, setCategory] =
    useState("")

  const [search, setSearch] =
  useState("")

const [categoryFilter,
  setCategoryFilter] =
  useState("")



  const [types, setTypes] =
    useState([])

  const [categories, setCategories] =
    useState([])

  const [programs, setPrograms] =
    useState([])



  const [editingId, setEditingId] =
    useState(null)



  // FETCH
  const fetchData = async () => {

    try {

      const organizationCode =
        localStorage.getItem(
          "organizationCode"
        )

      const [
        programsRes,
        typesRes,
        categoriesRes,
      ] = await Promise.all([

        fetch(
          `https://festpro.onrender.com/programs?organizationCode=${organizationCode}`
        ),

        fetch(
          `https://festpro.onrender.com/types?organizationCode=${organizationCode}`
        ),

        fetch(
          `https://festpro.onrender.com/categories?organizationCode=${organizationCode}`
        ),

      ])



      const programsData =
        await programsRes.json()

      const typesData =
        await typesRes.json()

      const categoriesData =
        await categoriesRes.json()



      setPrograms(

        Array.isArray(programsData)
          ? programsData
          : []

      )



      setTypes(

        Array.isArray(typesData)
          ? typesData
          : []

      )



      setCategories(

        Array.isArray(categoriesData)
          ? categoriesData
          : []

      )

    } catch (err) {

      console.log(err)

    }

  }



  useEffect(() => {

    fetchData()

  }, [])



  // RESET
  const resetForm = () => {

    setProgramName("")
    setProgramType("")
    setCategory("")

    setEditingId(null)

  }



  // ADD
  const addProgram = async () => {

    try {

      await fetch(

        "https://festpro.onrender.com/programs",

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

            programName,

            programType,

            category,

          }),

        }

      )



      resetForm()

      fetchData()

    } catch (err) {

      console.log(err)

    }

  }



  // UPDATE
  const updateProgram = async () => {

    try {

      await fetch(

        `https://festpro.onrender.com/programs/${editingId}`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            organizationCode:
              localStorage.getItem(
                "organizationCode"
              ),

            programName,

            programType,

            category,

          }),

        }

      )



      resetForm()

      fetchData()

    } catch (err) {

      console.log(err)

    }

  }



  // DELETE
  const deleteProgram = async (id) => {

    try {

      await fetch(

        `https://festpro.onrender.com/programs/${id}`,

        {

          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            organizationCode:
              localStorage.getItem(
                "organizationCode"
              ),

          }),

        }

      )



      fetchData()

    } catch (err) {

      console.log(err)

    }

  }
  
  const filteredPrograms =
  programs.filter((program) => {

    const matchesSearch =

      program.programName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    const matchesCategory =

      !categoryFilter ||

      program.category ===
      categoryFilter

    return (
      matchesSearch &&
      matchesCategory
    )

  })








  return (

    <div className="space-y-10">



      {/* HEADER */}

      <div className="flex items-center justify-between flex-wrap gap-5">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-3">

            Programs

          </h1>



          <p className="text-gray-400 text-lg">

            Manage fest programs

          </p>

        </div>



        <div className="w-20 h-20 rounded-3xl bg-orange-400/10 flex items-center justify-center border border-orange-400/20">

          <Layers3
            size={38}
            className="text-orange-400"
          />

        </div>

      </div>



      {/* FORM */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] p-8 shadow-2xl">



        <div className="grid md:grid-cols-2 gap-5">



          {/* NAME */}

          <div>

            <label className="text-gray-400 mb-3 block">

              Program Name

            </label>



            <input
              value={programName}
              onChange={(e) =>
                setProgramName(
                  e.target.value
                )
              }
              placeholder="Enter program name"
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-orange-400"
            />

          </div>



          {/* TYPE */}

          <div>

            <label className="text-gray-400 mb-3 block">

              Type

            </label>



            <select
              value={programType}
              onChange={(e) =>
                setProgramType(
                  e.target.value
                )
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-orange-400"
            >

              <option value="">
                Select Type
              </option>



              {types.map((type) => (

                <option
                  key={type._id}
                  value={type.typeName}
                >

                  {type.typeName}

                </option>

              ))}

            </select>

          </div>



          {/* CATEGORY */}

          <div>

            <label className="text-gray-400 mb-3 block">

              Category

            </label>



            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-orange-400"
            >

              <option value="">
                Select Category
              </option>



              {categories.map((cat) => (

                <option
                  key={cat._id}
                  value={cat.categoryName}
                >

                  {cat.categoryName}

                </option>

              ))}

            </select>

          </div>

        </div>



        {/* BUTTON */}

        <div className="mt-8">

          <button
            onClick={
              editingId
                ? updateProgram
                : addProgram
            }
            className="bg-gradient-to-r from-orange-400 to-red-500 text-black font-bold px-8 py-5 rounded-2xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-3"
          >

            <Plus size={22} />

            {editingId
              ? "Update Program"
              : "Add Program"}

          </button>

        </div>

      </div>

<div className="flex flex-col md:flex-row gap-4 p-5 border-b border-white/10">

  <input
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
    placeholder="Search program..."
    className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-4 outline-none"
  />

  <select
    value={categoryFilter}
    onChange={(e) =>
      setCategoryFilter(
        e.target.value
      )
    }
    className="bg-black/40 border border-white/10 rounded-2xl p-4 outline-none"
  >

    <option value="">
      All Categories
    </option>

    {[
      ...new Set(
        programs.map(
          (p) => p.category
        )
      ),
    ].map((category) => (

      <option
        key={category}
        value={category}
      >
        {category}
      </option>

    ))}

  </select>

</div>

      {/* TABLE */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] overflow-hidden shadow-2xl">



        <div className="overflow-x-auto">

          <table className="w-full">



            <thead className="bg-black/40 border-b border-white/10">

              <tr>

                <th className="p-6 text-left">

                  Program

                </th>

                <th className="p-6 text-left">

                  Type

                </th>

                <th className="p-6 text-left">

                  Category

                </th>

                <th className="p-6 text-left">

                  Actions

                </th>

              </tr>

            </thead>



            <tbody>

              {filteredPrograms.map((program) => (

                <tr
                  key={program._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >

                  <td className="p-6 text-lg font-semibold">

                    {program.programName}

                  </td>



                  <td className="p-6 text-orange-400 font-bold">

                    {program.programType}

                  </td>



                  <td className="p-6">

                    {program.category}

                  </td>



                  <td className="p-6">

                    <div className="flex gap-3">



                      <button
                        onClick={() => {

                          setEditingId(
                            program._id
                          )

                          setProgramName(
                            program.programName
                          )

                          setProgramType(
                            program.programType
                          )

                          setCategory(
                            program.category
                          )

                        }}
                        className="bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold flex items-center gap-2"
                      >

                        <Pencil size={18} />

                        Edit

                      </button>



                      <button
                        onClick={() =>
                          deleteProgram(
                            program._id
                          )
                        }
                        className="bg-red-500 text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2"
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