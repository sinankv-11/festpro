"use client"

import { useEffect, useState } from "react"

import {
  Trophy,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"

export default function ResultsPage() {

  const [assignments, setAssignments] =
    useState([])

  const [results, setResults] =
    useState([])

  const [studentName, setStudentName] =
    useState("")

  const [programName, setProgramName] =
    useState("")

  const [teamName, setTeamName] =
    useState("")

  const [type, setType] =
    useState("")

  const [position, setPosition] =
    useState("")

  const [grade, setGrade] =
    useState("")

  const [points, setPoints] =
    useState("")

  const [published, setPublished] =
    useState(false)

  const [editingId, setEditingId] =
    useState(null)

    const [search, setSearch] =
  useState("")

const [teamFilter,
  setTeamFilter] =
  useState("")

const [statusFilter,
  setStatusFilter] =
  useState("")


  // FETCH DATA
  const fetchData = async () => {

    try {

      const organizationCode =
        localStorage.getItem(
          "organizationCode"
        )

      const [
        assignmentsRes,
        resultsRes,
      ] = await Promise.all([

        fetch(
          `https://festpro.onrender.com/assignments?organizationCode=${organizationCode}`
        ),

        fetch(
          `https://festpro.onrender.com/results?organizationCode=${organizationCode}`
        ),

      ])

      const assignmentsData =
        await assignmentsRes.json()

      const resultsData =
        await resultsRes.json()

      setAssignments(
        Array.isArray(assignmentsData)
          ? assignmentsData
          : []
      )

      setResults(
        Array.isArray(resultsData)
          ? resultsData
          : []
      )

    } catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    fetchData()

  }, [])

  // SELECT ASSIGNMENT
  const handleAssignmentSelect = (
    value
  ) => {

    const selected =
      assignments.find(
        (a) =>
          `${a.studentName}-${a.programName}` ===
          value
      )

    if (selected) {

      setStudentName(
        selected.studentName || ""
      )

      setProgramName(
        selected.programName || ""
      )

      setTeamName(
        selected.teamName || ""
      )

      // FIXED TYPE
      setType(
        String(
          selected.type ||
          selected.programType ||
          ""
        )
      )

    }

  }

  // RESET
  const resetForm = () => {

    setStudentName("")
    setProgramName("")
    setTeamName("")
    setType("")
    setPosition("")
    setGrade("")
    setPoints("")
    setPublished(false)
    setEditingId(null)

  }

  // ADD RESULT
  const addResult = async () => {

    try {

      await fetch(
        "https://festpro.onrender.com/results",
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
            programName,
            teamName,
            type: type || "",
            programType: type || "",
            position,
            grade,
            points,
            published,

          }),

        }
      )

      resetForm()

      fetchData()

    } catch (err) {

      console.log(err)

    }

  }

  // UPDATE RESULT
  const updateResult = async () => {

    try {

      await fetch(
        `https://festpro.onrender.com/results/${editingId}`,
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
            programName,
            teamName,
            type: type || "",
            programType: type || "",
            position,
            grade,
            points,
            published,

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
  const deleteResult = async (id) => {

    try {

      await fetch(
        `https://festpro.onrender.com/results/${id}`,
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

  // PUBLISH / UNPUBLISH
  const togglePublish = async (
    result
  ) => {

    try {

      await fetch(
        `https://festpro.onrender.com/results/${result._id}`,
        {

          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            ...result,

            organizationCode:
              localStorage.getItem(
                "organizationCode"
              ),

            published:
              !result.published,

          }),

        }
      )

      fetchData()

    } catch (err) {

      console.log(err)

    }

  }



  const filteredResults =
  results.filter((result) => {

    const matchesSearch =

      result.studentName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      result.programName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    const matchesTeam =

      !teamFilter ||

      result.teamName ===
      teamFilter

    const matchesStatus =

      !statusFilter ||

      String(
        result.published
      ) === statusFilter

    return (
      matchesSearch &&
      matchesTeam &&
      matchesStatus
    )

  })




  return (

    <div className="space-y-10">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-3">

            Results

          </h1>

          <p className="text-gray-400 text-lg">

            Manage fest results

          </p>

        </div>

        <div className="w-24 h-24 rounded-[30px] bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">

          <Trophy
            size={40}
            className="text-yellow-400"
          />

        </div>

      </div>

      {/* FORM */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">

        <div className="grid md:grid-cols-2 gap-5">

          {/* ASSIGNMENT */}

          <select
            onChange={(e) =>
              handleAssignmentSelect(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          >

            <option value="">
              Select Assignment
            </option>

            {assignments.map(
              (assignment) => (

                <option
                  key={assignment._id}
                  value={`${assignment.studentName}-${assignment.programName}`}
                >

                  {assignment.studentName}
                  {" - "}
                  {assignment.programName}

                </option>

              )
            )}

          </select>

          {/* TEAM */}

          <input
            value={teamName || ""}
            readOnly
            placeholder="Team"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          />

          {/* PROGRAM */}

          <input
            value={programName || ""}
            readOnly
            placeholder="Program"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          />

          {/* TYPE */}

          <input
            value={type || ""}
            readOnly
            placeholder="Program Type"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          />

          {/* PLACE */}

          <input
            value={position || ""}
            onChange={(e) =>
              setPosition(
                e.target.value
              )
            }
            placeholder="Place (1st, 2nd...)"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          />

          {/* GRADE */}

          <input
            value={grade || ""}
            onChange={(e) =>
              setGrade(
                e.target.value
              )
            }
            placeholder="Grade (A, B...)"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          />

          {/* POINTS */}

          <input
            type="number"
            value={points || ""}
            onChange={(e) =>
              setPoints(
                e.target.value
              )
            }
            placeholder="Points"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
          />

        </div>

        {/* BUTTON */}

        <div className="mt-8">

          <button
            onClick={
              editingId
                ? updateResult
                : addResult
            }
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-5 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all"
          >

            <Plus size={22} />

            {editingId
              ? "Update Result"
              : "Add Result"}

          </button>

        </div>

      </div>


      <div className="flex flex-col lg:flex-row gap-4 p-5 border-b border-white/10">

  <input
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
    placeholder="Search student or program..."
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
        results.map(
          (r) => r.teamName
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

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }
    className="bg-black/40 border border-white/10 rounded-2xl p-4 outline-none"
  >

    <option value="">
      All Status
    </option>

    <option value="true">
      Published
    </option>

    <option value="false">
      Hidden
    </option>

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
                  Place
                </th>

                <th className="p-5 text-left">
                  Grade
                </th>

                <th className="p-5 text-left">
                  Points
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

              {filteredResults.map((result) => (

                <tr
                  key={result._id}
                  className="border-b border-white/5 hover:bg-white/5"
                >

                  <td className="p-5 font-bold">
                    {result.studentName}
                  </td>

                  <td className="p-5">
                    {result.teamName}
                  </td>

                  <td className="p-5">
                    {result.programName}
                  </td>

                  <td className="p-5">
                    {result.programType || "-"}
                  </td>

                  <td className="p-5">
                    {result.position}
                  </td>

                  <td className="p-5">
                    {result.grade || "-"}
                  </td>

                  <td className="p-5">
                    {result.points}
                  </td>

                  <td className="p-5">

                    {result.published ? (

                      <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm">

                        Published

                      </span>

                    ) : (

                      <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm">

                        Hidden

                      </span>

                    )}

                  </td>

                  <td className="p-5">

                    <div className="flex gap-3 flex-wrap">

                      {/* EDIT */}

                      <button
                        onClick={() => {

                          setEditingId(
                            result._id
                          )

                          setStudentName(
                            result.studentName || ""
                          )

                          setProgramName(
                            result.programName || ""
                          )

                          setTeamName(
                            result.teamName || ""
                          )

                          setType(
                            result.programType || ""
                          )

                          setPosition(
                            result.position || ""
                          )

                          setGrade(
                            result.grade || ""
                          )

                          setPoints(
                            result.points || ""
                          )

                          setPublished(
                            result.published || false
                          )

                        }}
                        className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >

                        <Pencil size={16} />

                        Edit

                      </button>

                      {/* DELETE */}

                      <button
                        onClick={() =>
                          deleteResult(
                            result._id
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >

                        <Trash2 size={16} />

                        Delete

                      </button>

                      {/* PUBLISH */}

                      <button
                        onClick={() =>
                          togglePublish(
                            result
                          )
                        }
                        className="bg-cyan-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >

                        {result.published ? (
                          <>
                            <EyeOff size={16} />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye size={16} />
                            Publish
                          </>
                        )}

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