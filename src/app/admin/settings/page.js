"use client"

import { useEffect, useState } from "react"

import {

  Settings,

  Trophy,

  Star,

  Lock,

  Unlock,

  Eye,

  EyeOff,

} from "lucide-react"



export default function SettingsPage() {



  const [leaderboardFreeze,
    setLeaderboardFreeze] =
    useState(false)



  const [topScorersEnabled,
    setTopScorersEnabled] =
    useState(true)



  // FETCH SETTINGS
  const fetchSettings = async () => {

    try {

      const res = await fetch(
        "https://festpro.onrender.com/settings"
      )



      const data = await res.json()



      setLeaderboardFreeze(
        data.leaderboardFreeze || false
      )



      setTopScorersEnabled(
        data.topScorersEnabled !== false
      )

    } catch (err) {

      console.log(err)

    }

  }



  useEffect(() => {

    fetchSettings()

  }, [])



  // UPDATE SETTINGS
  const updateSettings = async (
    updatedValues
  ) => {

    try {

      await fetch(

        "https://festpro.onrender.com/settings",

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify(
            updatedValues
          ),

        }

      )



      fetchSettings()

    } catch (err) {

      console.log(err)

    }

  }



  return (

    <div className="space-y-10">



      {/* HEADER */}

      <div className="flex items-center justify-between flex-wrap gap-5">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-3">

            Settings

          </h1>



          <p className="text-gray-400 text-lg">

            Control public visibility

          </p>

        </div>



        <div className="w-24 h-24 rounded-[30px] bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center">

          <Settings
            size={42}
            className="text-indigo-400"
          />

        </div>

      </div>



      {/* SETTINGS GRID */}

      <div className="grid lg:grid-cols-2 gap-8">



        {/* LEADERBOARD */}

        <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">



          <div className="flex items-center justify-between mb-8">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 flex items-center justify-center">

                <Trophy
                  size={30}
                  className="text-yellow-400"
                />

              </div>



              <div>

                <h2 className="text-2xl font-black">

                  Leaderboard

                </h2>



                <p className="text-gray-400">

                  Freeze or unfreeze rankings

                </p>

              </div>

            </div>



            {leaderboardFreeze ? (

              <Lock
                className="text-red-400"
                size={30}
              />

            ) : (

              <Unlock
                className="text-green-400"
                size={30}
              />

            )}

          </div>



          {/* STATUS */}

          <div className="mb-8">

            {leaderboardFreeze ? (

              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-5 font-bold">

                Leaderboard is Frozen

              </div>

            ) : (

              <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl p-5 font-bold">

                Leaderboard is Live

              </div>

            )}

          </div>



          {/* BUTTON */}

          <button
            onClick={() =>
              updateSettings({

                leaderboardFreeze:
                  !leaderboardFreeze,

                topScorersEnabled,

              })
            }
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 ${
              leaderboardFreeze
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >

            {leaderboardFreeze
              ? "Unfreeze Leaderboard"
              : "Freeze Leaderboard"}

          </button>

        </div>



        {/* TOP SCORERS */}

        <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">



          <div className="flex items-center justify-between mb-8">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-pink-400/10 flex items-center justify-center">

                <Star
                  size={30}
                  className="text-pink-400"
                />

              </div>



              <div>

                <h2 className="text-2xl font-black">

                  Top Scorers

                </h2>



                <p className="text-gray-400">

                  Show or hide top scorers

                </p>

              </div>

            </div>



            {topScorersEnabled ? (

              <Eye
                className="text-green-400"
                size={30}
              />

            ) : (

              <EyeOff
                className="text-red-400"
                size={30}
              />

            )}

          </div>



          {/* STATUS */}

          <div className="mb-8">

            {topScorersEnabled ? (

              <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl p-5 font-bold">

                Top Scorers Visible

              </div>

            ) : (

              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-5 font-bold">

                Top Scorers Hidden

              </div>

            )}

          </div>



          {/* BUTTON */}

          <button
            onClick={() =>
              updateSettings({

                leaderboardFreeze,

                topScorersEnabled:
                  !topScorersEnabled,

              })
            }
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 ${
              topScorersEnabled
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >

            {topScorersEnabled
              ? "Hide Top Scorers"
              : "Show Top Scorers"}

          </button>

        </div>

      </div>



      {/* INFO */}

      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 rounded-[35px] p-8 backdrop-blur-xl">

        <h2 className="text-2xl font-black mb-4">

          Public Display Controls

        </h2>



        <div className="space-y-4 text-gray-300 text-lg">

          <p>

            • Freezing leaderboard stops live ranking updates.

          </p>



          <p>

            • Published results will still remain visible.

          </p>



          <p>

            • Top scorers can be hidden anytime.

          </p>

        </div>

      </div>

    </div>

  )

}