"use client"

import { useEffect, useState } from "react"

import {
  ArrowLeft,
  Trophy,

  Medal,

} from "lucide-react"



export default function StudentPage() {



  const [leaderboard, setLeaderboard] =
    useState([])

  const [results, setResults] =
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
] = await Promise.all([

  fetch(
    `https://festpro.onrender.com/leaderboard?organizationCode=${organizationCode}`
  ),

  fetch(
    `https://festpro.onrender.com/published-results?organizationCode=${organizationCode}`
  ),

])



      const leaderboardData =
        await leaderboardRes.json()

      const resultsData =
        await resultsRes.json()



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


    } catch (err) {

      console.log(err)

    }

  }



  useEffect(() => {

    fetchData()



    const interval =
      setInterval(fetchData, 5000)



    return () =>
      clearInterval(interval)

  }, [])



  return (

    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      <button
      onClick={() => window.history.back()}
      className="fixed top-6 left-6 w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all z-50"
    >
      <ArrowLeft size={22} />
    </button>

      {/* HEADER */}

      <div className="text-center mb-16">

        <div className="inline-flex items-center justify-center w-28 h-28 rounded-[35px] bg-yellow-400/10 border border-yellow-400/20 mb-6">

          <Trophy
            size={50}
            className="text-yellow-400"
          />

        </div>



        <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">

          FEST LEADERBOARD

        </h1>



        <p className="text-gray-400 text-xl">

          Live published results and rankings

        </p>

      </div>



      {/* LEADERBOARD */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden backdrop-blur-xl mb-14">



        <div className="p-8 border-b border-white/10">

          <h2 className="text-3xl font-black flex items-center gap-3">

            <Trophy className="text-yellow-400" />

            Team Rankings

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

                  Points

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

                      <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 flex items-center justify-center font-black text-yellow-400">

                        #{index + 1}

                      </div>

                    </td>



                    <td className="p-6 text-2xl font-bold">

                      {team.teamName}

                    </td>



                    <td className="p-6 text-3xl font-black text-cyan-400">

                      {team.totalPoints}

                    </td>

                  </tr>

                )

              )}

            </tbody>

          </table>

        </div>

      </div>



      {/* RESULTS */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden backdrop-blur-xl">



        <div className="p-8 border-b border-white/10">

          <h2 className="text-3xl font-black flex items-center gap-3">

            <Medal className="text-yellow-400" />

            Published Results

          </h2>

        </div>



        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-black/40 border-b border-white/10">

              <tr>

                <th className="p-6 text-left">

                  Student

                </th>

                <th className="p-6 text-left">

                  Program

                </th>

                <th className="p-6 text-left">

                  Grade

                </th>

                <th className="p-6 text-left">

                  Points

                </th>

              </tr>

            </thead>



            <tbody>

              {results.map((result) => (

                <tr
                  key={result._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >

                  <td className="p-6">

                    <div>

                      <h3 className="font-bold text-lg">

                        {result.studentName}

                      </h3>



                      <p className="text-gray-400 text-sm">

                        {result.teamName}

                      </p>

                    </div>

                  </td>



                  <td className="p-6 font-semibold">

                    {result.programName}

                  </td>



                  <td className="p-6 text-cyan-400 font-bold">

                    {result.grade}

                  </td>



                  <td className="p-6 text-yellow-400 text-2xl font-black">

                    {result.points}

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