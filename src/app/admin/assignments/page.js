"use client"

import { useEffect, useState } from "react"

import {
  Link2,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react"

export default function AssignmentsPage() {

  const [students, setStudents] =
    useState([])

  const [programs, setPrograms] =
    useState([])

  const [assignments, setAssignments] =
    useState([])

  const [selectedStudentId,
    setSelectedStudentId] =
    useState("")

  const [studentName,
    setStudentName] =
    useState("")

  const [teamName,
    setTeamName] =
    useState("")

  const [category,
    setCategory] =
    useState("")

  const [programName,
    setProgramName] =
    useState("")

  const [type,
    setType] =
    useState("")

  const [editingId,
    setEditingId] =
    useState(null)

  const [search, setSearch] =
  useState("")

const [programFilter,
  setProgramFilter] =
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
        programsRes,
        assignmentsRes,
      ] = await Promise.all([

        fetch(
          `https://festpro.onrender.com/students?organizationCode=${organizationCode}`
        ),

        fetch(
          `https://festpro.onrender.com/programs?organizationCode=${organizationCode}`
        ),

        fetch(
          `https://festpro.onrender.com/assignments?organizationCode=${organizationCode}`
        ),

      ])

      const studentsData =
        await studentsRes.json()

      const programsData =
        await programsRes.json()

      const assignmentsData =
        await assignmentsRes.json()

      setStudents(
        Array.isArray(studentsData)
          ? studentsData
          : []
      )

      setPrograms(
        Array.isArray(programsData)
          ? programsData
          : []
      )

      setAssignments(
        Array.isArray(assignmentsData)
          ? assignmentsData
          : []
      )

    } catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    fetchData()

  }, [])

  // STUDENT SELECT
  const handleStudentSelect = (
    id
  ) => {

    setSelectedStudentId(id)

    const student =
      students.find(
        (s) => s.studentId === id
      )

    if (student) {

      setStudentName(
        student.studentName
      )

      setTeamName(
        student.teamName
      )

      setCategory(
        student.category
      )

    }

  }

  // PROGRAM SELECT
  const handleProgramSelect = (
    name
  ) => {

    setProgramName(name)

    const program =
      programs.find(
        (p) =>
          p.programName === name
      )

    if (program) {

      setType(
        program.programType || program.type
      )

    }

  }

  // RESET
  const resetForm = () => {

    setSelectedStudentId("")
    setStudentName("")
    setTeamName("")
    setCategory("")
    setProgramName("")
    setType("")
    setEditingId(null)

  }

  // ADD
  const addAssignment = async () => {

    try {

      await fetch(
        "https://festpro.onrender.com/assignments",
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

            studentId: selectedStudentId,
            studentName,
            teamName,
            category,
            programName,

            programType: type,
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
  const updateAssignment =
    async () => {

      try {

        await fetch(

          `https://festpro.onrender.com/assignments/${editingId}`,

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

              studentId: selectedStudentId,
              studentName,
              teamName,
              category,
              programName,

              programType: type,
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
  const deleteAssignment =
    async (id) => {

      try {

        await fetch(

          `https://festpro.onrender.com/assignments/${id}`,

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




    const filteredAssignments =
  assignments.filter(
    (assignment) => {

      const matchesSearch =

        assignment.studentName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        assignment.studentId
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesProgram =

        !programFilter ||

        assignment.programName ===
        programFilter

      return (
        matchesSearch &&
        matchesProgram
      )

    }
  )




  return (

    <div className="space-y-10">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-3">

            Assignments

          </h1>

          <p className="text-gray-400 text-lg">

            Assign students to programs

          </p>

        </div>

        <div className="w-24 h-24 rounded-[30px] bg-pink-400/10 border border-pink-400/20 flex items-center justify-center">

          <Link2
            size={40}
            className="text-pink-400"
          />

        </div>

      </div>

      {/* FORM */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">

        <div className="grid md:grid-cols-2 gap-5">

          {/* STUDENT ID */}

          <select
            value={selectedStudentId}
            onChange={(e) =>
              handleStudentSelect(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          >

            <option value="">
              Select Student ID
            </option>

            {students.map((student) => (

              <option
                key={student._id}
                value={student.studentId}
              >
                {student.studentId} - {student.studentName}
              </option>

            ))}

          </select>

          {/* STUDENT NAME */}

          <input
            value={studentName}
            readOnly
            placeholder="Student Name"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          />

          {/* TEAM */}

          <input
            value={teamName}
            readOnly
            placeholder="Team"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          />

          {/* CATEGORY */}

          <input
            value={category}
            readOnly
            placeholder="Category"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          />

          {/* PROGRAM */}

          <select
            value={programName}
            onChange={(e) =>
              handleProgramSelect(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          >

            <option value="">
              Select Program
            </option>

            {programs.map((program) => (

              <option
                key={program._id}
                value={program.programName}
              >

                {program.programName} ({program.programType}) - {program.category}

              </option>

            ))}

          </select>

          {/* TYPE */}

          <input
            value={type}
            readOnly
            placeholder="Type"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          />

        </div>

        {/* BUTTON */}

        <div className="mt-8">

          <button
            onClick={
              editingId
                ? updateAssignment
                : addAssignment
            }
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-black font-bold px-8 py-5 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all"
          >

            <Plus size={22} />

            {editingId
              ? "Update Assignment"
              : "Add Assignment"}

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
    placeholder="Search student..."
    className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-4 outline-none"
  />

  <select
    value={programFilter}
    onChange={(e) =>
      setProgramFilter(
        e.target.value
      )
    }
    className="bg-black/40 border border-white/10 rounded-2xl p-4 outline-none"
  >

    <option value="">
      All Programs
    </option>

    {[
      ...new Set(
        assignments.map(
          (a) =>
            a.programName
        )
      ),
    ].map((program) => (

      <option
        key={program}
        value={program}
      >
        {program}
      </option>

    ))}

  </select>

</div>




      {/* TABLE */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden backdrop-blur-xl">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-black/40 border-b border-white/10">

              <tr>

                <th className="p-5 text-left">
                  Student
                </th>

                <th className="p-5 text-left">
                  Team
                </th>

                <th className="p-5 text-left">
                  Program
                </th>

                <th className="p-5 text-left">
                  Type
                </th>

                <th className="p-5 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredAssignments.map(
                (assignment) => (

                  <tr
                    key={assignment._id}
                    className="border-b border-white/5 hover:bg-white/5"
                  >

                    <td className="p-5">

                      <div>

                        <h3 className="font-bold">

                          {
                            assignment.studentName
                          }

                        </h3>

                        <p className="text-gray-400 text-sm">

                          {
                            assignment.studentId
                          }

                        </p>

                      </div>

                    </td>

                    <td className="p-5">
                      {assignment.teamName}
                    </td>

                    <td className="p-5">
                      {assignment.programName}
                    </td>

                    <td className="p-5">
                      {assignment.programType || "-"}
                    </td>

                    <td className="p-5">

                      <div className="flex gap-3">

                        <button
                          onClick={() => {

                            setEditingId(
                              assignment._id
                            )

                            setSelectedStudentId(
                              assignment.studentId
                            )

                            setStudentName(
                              assignment.studentName
                            )

                            setTeamName(
                              assignment.teamName
                            )

                            setCategory(
                              assignment.category
                            )

                            setProgramName(
                              assignment.programName
                            )

                            setType(
                              assignment.programType || ""
                            )

                          }}
                          className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                        >

                          <Pencil size={16} />

                          Edit

                        </button>

                        <button
                          onClick={() =>
                            deleteAssignment(
                              assignment._id
                            )
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                        >

                          <Trash2 size={16} />

                          Delete

                        </button>

                      </div>

                    </td>

                  </tr>

                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}