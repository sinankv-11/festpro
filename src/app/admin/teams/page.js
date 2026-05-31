"use client"

import { useEffect, useState } from "react"

import {

  Shield,

  Plus,

  Pencil,

  Trash2,

} from "lucide-react"



export default function TeamsPage() {



  const [teamName, setTeamName] =
    useState("")



  const [teams, setTeams] =
    useState([])



  const [editingId, setEditingId] =
    useState(null)



  // FETCH
  const fetchTeams = async () => {

    try {

      const organizationCode =
        localStorage.getItem(
          "organizationCode"
        )

      const res = await fetch(
        `http://localhost:5000/teams?organizationCode=${organizationCode}`
      )



      const data = await res.json()



      setTeams(

        Array.isArray(data)
          ? data
          : []

      )

    } catch (err) {

      console.log(err)

    }

  }



  useEffect(() => {

    fetchTeams()

  }, [])



  // RESET
  const resetForm = () => {

    setTeamName("")
    setEditingId(null)

  }



  // ADD
  const addTeam = async () => {

    try {

      await fetch(

        "http://localhost:5000/teams",

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

            teamName,

          }),

        }

      )



      resetForm()

      fetchTeams()

    } catch (err) {

      console.log(err)

    }

  }



  // UPDATE
  const updateTeam = async () => {

    try {

      await fetch(

        `http://localhost:5000/teams/${editingId}`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            teamName,

          }),

        }

      )



      resetForm()

      fetchTeams()

    } catch (err) {

      console.log(err)

    }

  }



  // DELETE
  const deleteTeam = async (id) => {

    try {

      await fetch(

        `http://localhost:5000/teams/${id}`,

        {

          method: "DELETE",

        }

      )



      fetchTeams()

    } catch (err) {

      console.log(err)

    }

  }



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

            Teams

          </h1>



          <p className="text-gray-400 text-lg">

            Manage fest teams

          </p>

        </div>



        <div className="w-24 h-24 rounded-[30px] bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">

          <Shield
            size={42}
            className="text-cyan-400"
          />

        </div>

      </div>



      {/* FORM */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl shadow-2xl">



        <div className="grid md:grid-cols-[1fr_auto] gap-5">



          <input
            value={teamName}
            onChange={(e) =>
              setTeamName(
                e.target.value
              )
            }
            placeholder="Enter team name"
            className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-400 text-lg"
          />



          <button
            onClick={
              editingId
                ? updateTeam
                : addTeam
            }
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold px-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
          >

            <Plus size={22} />

            {editingId
              ? "Update Team"
              : "Add Team"}

          </button>

        </div>

      </div>



      {/* TEAM GRID */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">



        {teams.map((team, index) => (

          <div
            key={team._id}
            className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >



            {/* TOP */}

            <div className="flex items-center justify-between mb-8">



              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colors[index % colors.length]} flex items-center justify-center`}
              >

                <Shield
                  size={30}
                  className="text-white"
                />

              </div>



              <div className="text-5xl font-black text-white/10">

                #{index + 1}

              </div>

            </div>



            {/* TEAM NAME */}

            <h2 className="text-3xl font-black mb-8">

              {team.teamName}

            </h2>



            {/* ACTIONS */}

            <div className="flex gap-4">



              <button
                onClick={() => {

                  setEditingId(
                    team._id
                  )



                  setTeamName(
                    team.teamName
                  )

                }}
                className="flex-1 bg-yellow-400 text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all"
              >

                <Pencil size={18} />

                Edit

              </button>



              <button
                onClick={() =>
                  deleteTeam(team._id)
                }
                className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all"
              >

                <Trash2 size={18} />

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}