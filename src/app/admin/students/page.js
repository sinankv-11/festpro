"use client"

import { useEffect, useState } from "react"

import {

  Users,

  Plus,

  Pencil,

  Trash2,

  Search,

} from "lucide-react"



export default function StudentsPage() {



  const [studentName, setStudentName] =
    useState("")



  const [studentId, setStudentId] =
    useState("")



  const [teamName, setTeamName] =
    useState("")



  const [category, setCategory] =
    useState("")



  const [students, setStudents] =
    useState([])



  const [teams, setTeams] =
    useState([])



  const [categories, setCategories] =
    useState([])



  const [editingId, setEditingId] =
    useState(null)



  const [search, setSearch] =
    useState("")

  const [teamFilter, setTeamFilter] =
    useState("")



  // FETCH
  const fetchData = async () => {

    try {

      const organizationCode =
        localStorage.getItem(
          "organizationCode"
        )

      const [
        studentsRes,
        teamsRes,
        categoriesRes,
      ] = await Promise.all([

        fetch(
          `http://localhost:5000/students?organizationCode=${organizationCode}`
        ),

        fetch(
          `http://localhost:5000/teams?organizationCode=${organizationCode}`
        ),

        fetch(
          `http://localhost:5000/categories?organizationCode=${organizationCode}`
        )

      ])



      const studentsData =
        await studentsRes.json()

      const teamsData =
        await teamsRes.json()

      const categoriesData =
        await categoriesRes.json()



      setStudents(

        Array.isArray(studentsData)
          ? studentsData
          : []

      )



      setTeams(

        Array.isArray(teamsData)
          ? teamsData
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

    setStudentName("")
    setStudentId("")
    setTeamName("")
    setCategory("")

    setEditingId(null)

  }



  // ADD
  const addStudent = async () => {

    try {

      await fetch(

        "http://localhost:5000/students",

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

            studentName,

            studentId,

            teamName,

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
  const updateStudent = async () => {

    try {

      await fetch(

        `http://localhost:5000/students/${editingId}`,

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

            studentName,

            studentId,

            teamName,

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
  const deleteStudent = async (id) => {

    try {

      await fetch(

        `http://localhost:5000/students/${id}`,

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



  const filteredStudents =
    students.filter((student) => {

      const matchesSearch =

        student.studentName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        student.studentId
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesTeam =

        !teamFilter ||

        student.teamName ===
        teamFilter

      return (
        matchesSearch &&
        matchesTeam
      )

    })



  const colors = [

    "from-cyan-400 to-blue-500",

    "from-pink-400 to-rose-500",

    "from-yellow-400 to-orange-500",

    "from-green-400 to-emerald-500",

    "from-purple-400 to-indigo-500",

  ]






  return (

    <div className="space-y-10">



      {/* HEADER */}

      <div className="flex items-center justify-between flex-wrap gap-5">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">

            Students

          </h1>



          <p className="text-gray-400 text-lg">

            Manage fest students

          </p>

        </div>



        <div className="w-24 h-24 rounded-[30px] bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">

          <Users
            size={42}
            className="text-cyan-400"
          />

        </div>

      </div>



      {/* FORM */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl shadow-2xl">



        <div className="grid md:grid-cols-2 gap-5">



          {/* NAME */}

          <div>

            <label className="text-gray-400 mb-3 block">

              Student Name

            </label>



            <input
              value={studentName}
              onChange={(e) =>
                setStudentName(
                  e.target.value
                )
              }
              placeholder="Enter student name"
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-400"
            />

          </div>



          {/* ID */}

          <div>

            <label className="text-gray-400 mb-3 block">

              Student ID

            </label>



            <input
              value={studentId}
              onChange={(e) =>
                setStudentId(
                  e.target.value
                )
              }
              placeholder="STD001"
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-400"
            />

          </div>



          {/* TEAM */}

          <div>

            <label className="text-gray-400 mb-3 block">

              Team

            </label>



            <select
              value={teamName}
              onChange={(e) =>
                setTeamName(
                  e.target.value
                )
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-400"
            >

              <option value="">
                Select Team
              </option>



              {teams.map((team) => (

                <option
                  key={team._id}
                  value={team.teamName}
                >

                  {team.teamName}

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
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-400"
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
                ? updateStudent
                : addStudent
            }
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold px-8 py-5 rounded-2xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-3"
          >

            <Plus size={22} />

            {editingId
              ? "Update Student"
              : "Add Student"}

          </button>

        </div>

      </div>



      {/* SEARCH */}

      <div className="flex flex-col md:flex-row gap-4 mb-5">

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search student..."
          className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-4 outline-none"
        />

        <select
          value={teamFilter}
          onChange={(e) =>
            setTeamFilter(
              e.target.value
            )
          }
          className="bg-black/40 border border-white/10 rounded-2xl p-4 outline-none"
        >

          <option value="">
            All Teams
          </option>

          {[
            ...new Set(
              students.map(
                (s) => s.teamName
              )
            ),
          ].map((team) => (

            <option
              key={team}
              value={team}
            >
              {team}
            </option>

          ))}

        </select>

      </div>



      {/* STUDENT GRID */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">



        {filteredStudents.map(

          (student, index) => (

            <div
              key={student._id}
              className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >



              {/* TOP */}

              <div className="flex items-center justify-between mb-8">



                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colors[index % colors.length]} flex items-center justify-center`}
                >

                  <Users
                    size={30}
                    className="text-white"
                  />

                </div>



                <div className="text-5xl font-black text-white/10">

                  #{index + 1}

                </div>

              </div>



              {/* INFO */}

              <h2 className="text-3xl font-black mb-2">

                {student.studentName}

              </h2>



              <p className="text-cyan-400 font-bold mb-4">

                {student.studentId}

              </p>



              <div className="space-y-3 mb-8">

                <div className="flex items-center justify-between">

                  <span className="text-gray-400">

                    Team

                  </span>



                  <span className="font-bold">

                    {student.teamName}

                  </span>

                </div>



                <div className="flex items-center justify-between">

                  <span className="text-gray-400">

                    Category

                  </span>



                  <span className="font-bold">

                    {student.category}

                  </span>

                </div>

              </div>



              {/* ACTIONS */}

              <div className="flex gap-4">



                <button
                  onClick={() => {

                    setEditingId(
                      student._id
                    )



                    setStudentName(
                      student.studentName
                    )



                    setStudentId(
                      student.studentId
                    )



                    setTeamName(
                      student.teamName
                    )



                    setCategory(
                      student.category
                    )

                  }}
                  className="flex-1 bg-yellow-400 text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all"
                >

                  <Pencil size={18} />

                  Edit

                </button>



                <button
                  onClick={() =>
                    deleteStudent(
                      student._id
                    )
                  }
                  className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all"
                >

                  <Trash2 size={18} />

                  Delete

                </button>

              </div>

            </div>

          )

        )}

      </div>

    </div>

  )

}