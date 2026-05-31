"use client"

import {
    FileDown,
    Users,
    Trophy,
    ClipboardList,
    Medal,
    Layers3,
} from "lucide-react"

export default function ExportsPage() {

    const downloadFile = (url) => {
        window.open(url, "_blank")
    }

    return (

        <div className="space-y-10">

            {/* HEADER */}

            <div className="flex items-center justify-between flex-wrap gap-5">

                <div>

                    <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3">

                        Exports

                    </h1>

                    <p className="text-gray-400 text-lg">

                        Download PDF reports

                    </p>

                </div>

                <div className="w-24 h-24 rounded-[30px] bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">

                    <FileDown
                        size={42}
                        className="text-cyan-400"
                    />

                </div>

            </div>

            {/* EXPORT CARDS */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                {/* STUDENTS */}

                <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">

                    <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6">

                        <Users
                            size={30}
                            className="text-cyan-400"
                        />

                    </div>

                    <h2 className="text-2xl font-black mb-3">

                        Students
                    </h2>

                    <p className="text-gray-400 mb-8">

                        Export student list
                    </p>

                    <button
                        onClick={() =>
                            downloadFile(
                                "http://localhost:5000/export/students"
                            )
                        }
                        className="w-full bg-cyan-400 text-black font-bold py-4 rounded-2xl hover:scale-105 transition-all"
                    >
                        Download PDF
                    </button>

                </div>

                {/* PROGRAMS */}

                <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">

                    <div className="w-16 h-16 rounded-2xl bg-orange-400/10 flex items-center justify-center mb-6">

                        <Layers3
                            size={30}
                            className="text-orange-400"
                        />

                    </div>

                    <h2 className="text-2xl font-black mb-3">

                        Programs
                    </h2>

                    <p className="text-gray-400 mb-8">

                        Export Programs list
                    </p>

                    <button
                        onClick={() =>
                            downloadFile(
                                "http://localhost:5000/export/programs"
                            )
                        }
                        className="w-full bg-orange-400 text-black font-bold py-4 rounded-2xl hover:scale-105 transition-all"                    >
                        Download PDF
                    </button>

                </div>

                {/* TEAMS */}

                <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">

                    <div className="w-16 h-16 rounded-2xl bg-green-400/10 flex items-center justify-center mb-6">

                        <Trophy
                            size={30}
                            className="text-green-400"
                        />

                    </div>

                    <h2 className="text-2xl font-black mb-3">

                        Teams
                    </h2>

                    <p className="text-gray-400 mb-8">

                        Export team list
                    </p>

                    <button
                        onClick={() =>
                            downloadFile(
                                "http://localhost:5000/export/teams"
                            )
                        }
                        className="w-full bg-green-400 text-black font-bold py-4 rounded-2xl hover:scale-105 transition-all"
                    >
                        Download PDF
                    </button>

                </div>

                {/* ASSIGNMENTS */}

                <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">

                    <div className="w-16 h-16 rounded-2xl bg-pink-400/10 flex items-center justify-center mb-6">

                        <ClipboardList
                            size={30}
                            className="text-pink-400"
                        />

                    </div>

                    <h2 className="text-2xl font-black mb-3">

                        Assignments
                    </h2>

                    <p className="text-gray-400 mb-8">

                        Export assignments
                    </p>

                    <button
                        onClick={() =>
                            downloadFile(
                                "http://localhost:5000/export/assignments"
                            )
                        }
                        className="w-full bg-pink-400 text-black font-bold py-4 rounded-2xl hover:scale-105 transition-all"
                    >
                        Download PDF
                    </button>

                </div>

                {/* RESULTS */}

                <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">

                    <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 flex items-center justify-center mb-6">

                        <Medal
                            size={30}
                            className="text-yellow-400"
                        />

                    </div>

                    <h2 className="text-2xl font-black mb-3">

                        Results
                    </h2>

                    <p className="text-gray-400 mb-8">

                        Export results
                    </p>

                    <button
                        onClick={() =>
                            downloadFile(
                                "http://localhost:5000/export/results"
                            )
                        }
                        className="w-full bg-yellow-400 text-black font-bold py-4 rounded-2xl hover:scale-105 transition-all"
                    >
                        Download PDF
                    </button>

                </div>

            </div>

        </div>

    )
}