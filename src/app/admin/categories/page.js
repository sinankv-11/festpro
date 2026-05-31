"use client"

import { useEffect, useState } from "react"

import {

  FolderKanban,

  Plus,

  Pencil,

  Trash2,

} from "lucide-react"



export default function CategoriesPage() {



  const [categoryName, setCategoryName] =
    useState("")

  const [categories, setCategories] =
    useState([])

  const [editingId, setEditingId] =
    useState(null)



  // FETCH
  const fetchCategories = async () => {

    try {

      const organizationCode =
        localStorage.getItem(
          "organizationCode"
        )

      const res = await fetch(
        `http://localhost:5000/categories?organizationCode=${organizationCode}`
      )

      const data = await res.json()

      setCategories(

        Array.isArray(data)
          ? data
          : []

      )

    } catch (err) {

      console.log(err)

    }

  }



  useEffect(() => {

    fetchCategories()

  }, [])



  // RESET
  const resetForm = () => {

    setCategoryName("")
    setEditingId(null)

  }



  // ADD
  const addCategory = async () => {

    try {

      await fetch(

        "http://localhost:5000/categories",

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

            categoryName,

          }),

        }

      )



      resetForm()

      fetchCategories()

    } catch (err) {

      console.log(err)

    }

  }



  // UPDATE
  const updateCategory = async () => {

    try {

      await fetch(

        `http://localhost:5000/categories/${editingId}`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            categoryName,

          }),

        }

      )



      resetForm()

      fetchCategories()

    } catch (err) {

      console.log(err)

    }

  }



  // DELETE
  const deleteCategory = async (id) => {

    try {

      await fetch(

        `http://localhost:5000/categories/${id}`,

        {

          method: "DELETE",

        }

      )



      fetchCategories()

    } catch (err) {

      console.log(err)

    }

  }



  return (

    <div className="space-y-10">



      {/* HEADER */}

      <div className="flex items-center justify-between flex-wrap gap-5">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-3">

            Categories

          </h1>



          <p className="text-gray-400 text-lg">

            Manage competition categories

          </p>

        </div>



        <div className="w-20 h-20 rounded-3xl bg-purple-400/10 flex items-center justify-center border border-purple-400/20">

          <FolderKanban
            size={38}
            className="text-purple-400"
          />

        </div>

      </div>



      {/* FORM */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] p-8 shadow-2xl">



        <div className="grid md:grid-cols-[1fr_auto] gap-5">



          <input
            value={categoryName}
            onChange={(e) =>
              setCategoryName(
                e.target.value
              )
            }
            placeholder="Enter category name"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-purple-400 text-lg"
          />



          <button
            onClick={
              editingId
                ? updateCategory
                : addCategory
            }
            className="bg-gradient-to-r from-purple-400 to-pink-500 text-black font-bold px-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 justify-center"
          >

            <Plus size={22} />

            {editingId
              ? "Update Category"
              : "Add Category"}

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

                  Category Name

                </th>



                <th className="p-6 text-left text-gray-300">

                  Actions

                </th>

              </tr>

            </thead>



            <tbody>

              {categories.map((category) => (

                <tr
                  key={category._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >

                  <td className="p-6">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-purple-400/10 flex items-center justify-center">

                        <FolderKanban
                          size={20}
                          className="text-purple-400"
                        />

                      </div>



                      <span className="text-xl font-semibold">

                        {category.categoryName}

                      </span>

                    </div>

                  </td>



                  <td className="p-6">

                    <div className="flex gap-3">



                      <button
                        onClick={() => {

                          setEditingId(
                            category._id
                          )

                          setCategoryName(
                            category.categoryName
                          )

                        }}
                        className="bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-2"
                      >

                        <Pencil size={18} />

                        Edit

                      </button>



                      <button
                        onClick={() =>
                          deleteCategory(
                            category._id
                          )
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