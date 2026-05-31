"use client"

import { useEffect, useState } from "react"

import {

  Trophy,

  Users,

  Layers3,

  Medal,

  Star,

} from "lucide-react"



export default function DashboardPage() {



  const [leaderboard, setLeaderboard] =
    useState([])

  const [results, setResults] =
    useState([])

  const [students, setStudents] =
    useState([])

  const [programs, setPrograms] =
    useState([])



  // FETCH
  const fetchData = async () => {

  try {

    const organizationCode =
      localStorage.getItem(
        "organizationCode"
      )

    const [

      leaderboardRes,

      resultsRes,

      studentsRes,

      programsRes,

    ] = await Promise.all([

      fetch(
        `http://localhost:5000/leaderboard?organizationCode=${organizationCode}`
      ),

      fetch(
        `http://localhost:5000/results?organizationCode=${organizationCode}`
      ),

      fetch(
        `http://localhost:5000/students?organizationCode=${organizationCode}`
      ),

      fetch(
        `http://localhost:5000/programs?organizationCode=${organizationCode}`
      ),

    ])

    const leaderboardData =
      await leaderboardRes.json()

    const resultsData =
      await resultsRes.json()

    const studentsData =
      await studentsRes.json()

    const programsData =
      await programsRes.json()

    setLeaderboard(
      Array.isArray(leaderboardData)
        ? leaderboardData
        : []
    )

    setResults(
      Array.isArray(resultsData)
        ? resultsData
        : []
    )

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

  } catch (err) {

    console.log(err)

  }

}



  useEffect(() => {

    fetchData()

  }, [])



  const publishedResults =
    results.filter(
      (r) => r.published
    )



  return (

    <div className="space-y-10">



      {/* HEADER */}

      <div className="flex items-center justify-between flex-wrap gap-5">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">

            Dashboard

          </h1>



          <p className="text-gray-400 text-lg">

            Fest management overview

          </p>

        </div>



        <div className="w-24 h-24 rounded-[30px] bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">

          <Trophy
            size={42}
            className="text-cyan-400"
          />

        </div>

      </div>



      {/* STATS */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">



        {/* STUDENTS */}

        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/20 rounded-[30px] p-7 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400">

                Students

              </p>



              <h2 className="text-5xl font-black mt-3">

                {students.length}

              </h2>

            </div>



            <Users
              size={42}
              className="text-cyan-400"
            />

          </div>

        </div>



        {/* PROGRAMS */}

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-400/20 rounded-[30px] p-7 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400">

                Programs

              </p>



              <h2 className="text-5xl font-black mt-3">

                {programs.length}

              </h2>

            </div>



            <Layers3
              size={42}
              className="text-orange-400"
            />

          </div>

        </div>



        {/* RESULTS */}

        <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border border-yellow-400/20 rounded-[30px] p-7 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400">

                Published Results

              </p>



              <h2 className="text-5xl font-black mt-3">

                {publishedResults.length}

              </h2>

            </div>



            <Medal
              size={42}
              className="text-yellow-400"
            />

          </div>

        </div>



        {/* TEAMS */}

        <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-400/20 rounded-[30px] p-7 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400">

                Leading Team

              </p>



              <h2 className="text-3xl font-black mt-3">

                {leaderboard[0]?.teamName ||
                  "-"}

              </h2>

            </div>



            <Star
              size={42}
              className="text-pink-400"
            />

          </div>

        </div>

      </div>



      {/* LEADERBOARD */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] overflow-hidden shadow-2xl">



        <div className="p-8 border-b border-white/10">

          <h2 className="text-3xl font-black flex items-center gap-3">

            <Trophy className="text-yellow-400" />

            Team Leaderboard

          </h2>

        </div>



        <div className="overflow-x-auto">

          <table className="w-full">



            <thead className="bg-black/40 border-b border-white/10">

              <tr>

                <th className="p-6 text-left">

                  Rank

                </th>

                <th className="p-6 text-left">

                  Team

                </th>

                <th className="p-6 text-left">

                  Total Points

                </th>

              </tr>

            </thead>



            <tbody>

              {leaderboard.map(

                (team, index) => (

                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >

                    <td className="p-6">

                      <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center font-black text-yellow-400">

                        #{index + 1}

                      </div>

                    </td>



                    <td className="p-6 text-xl font-bold">

                      {team.teamName}

                    </td>



                    <td className="p-6 text-2xl font-black text-cyan-400">

                      {team.totalPoints}

                    </td>

                  </tr>

                )

              )}

            </tbody>

          </table>

        </div>

      </div>



      {/* RECENT RESULTS */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] overflow-hidden shadow-2xl">



        <div className="p-8 border-b border-white/10">

          <h2 className="text-3xl font-black flex items-center gap-3">

            <Medal className="text-yellow-400" />

            Recent Published Results

          </h2>

        </div>



        <div className="divide-y divide-white/5">



          {publishedResults

            .slice(-5)

            .reverse()

            .map((result) => (

              <div
                key={result._id}
                className="p-6 flex items-center justify-between hover:bg-white/5 transition-all"
              >

                <div>

                  <h3 className="text-xl font-bold">

                    {result.studentName}

                  </h3>



                  <p className="text-gray-400">

                    {result.programName}

                  </p>

                </div>



                <div className="text-right">

                  <p className="text-2xl font-black text-yellow-400">

                    {result.points}

                  </p>



                  <p className="text-cyan-400 font-bold">

                    {result.grade}

                  </p>

                </div>

              </div>

            ))}

        </div>

      </div>

    </div>

  )

}