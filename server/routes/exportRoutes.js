const express = require("express")
const PDFDocument = require("pdfkit-table")

const Student = require("../models/Student")
const Team = require("../models/Team")
const Assignment = require("../models/Assignment")
const Result = require("../models/Result")
const Program = require("../models/Program")

const router = express.Router()

// STUDENTS PDF

router.get("/export/students", async (req, res) => {

  try {

    const students =
      await Student.find()

    const doc =
      new PDFDocument({
        margin: 30,
        size: "A4",
      })

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=students.pdf"
    )

    doc.pipe(res)

    doc
      .fontSize(20)
      .text(
        "Students Report",
        {
          align: "center",
        }
      )

    doc.moveDown()

    const table = {

      headers: [
        "Student Name",
        "Student ID",
        "Team",
        "Category",
      ],

      rows: students.map(
        (student) => [

          student.studentName || "",

          student.studentId || "",

          student.teamName || "",

          student.category || "",

        ]
      ),

    }

    await doc.table(table)

    doc.end()

  } catch (err) {

    console.log(err)

    res.status(500).json(err)

  }

})

// PROGRAM PDF

router.get("/export/programs", async (req, res) => {
  try {

    const programs = await Program.find()

    const doc = new PDFDocument({
      margin: 30,
      size: "A4",
    })

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Programs.pdf"
    )

    doc.pipe(res)

    doc
      .fontSize(20)
      .text("Programs Report", {
        align: "center",
      })

    doc.moveDown()

    const table = {
      headers: [
        "Program",
        "Type",
        "Category",
      ],

      rows: programs.map((program) => [
        program.programName || "",
        program.programType || "",
        program.category || "",
      ]),
    }

    await doc.table(table)

    doc.end()

  } catch (err) {

    console.log(err)

    res.status(500).send(
      "Error generating PDF"
    )

  }
})

// TEAMS PDF

router.get("/export/teams", async (req, res) => {
  try {

    const teams = await Team.find()

    const doc = new PDFDocument({
      margin: 30,
      size: "A4",
    })

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Teams.pdf"
    )

    doc.pipe(res)

    doc
      .fontSize(20)
      .text("Teams Report", {
        align: "center",
      })

    doc.moveDown()

    const table = {
      headers: ["Team Name"],

      rows: teams.map((team) => [
        team.teamName || "",
      ]),
    }

    await doc.table(table)

    doc.end()

  } catch (err) {

    console.log(err)

    res.status(500).send("Error")

  }
})

// ASSIGNMENTS PDF

router.get("/export/assignments", async (req, res) => {
  try {

    const assignments =
      await Assignment.find()

    const doc = new PDFDocument({
      margin: 30,
      size: "A4",
    })

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Assignments.pdf"
    )

    doc.pipe(res)

    doc
      .fontSize(20)
      .text("Assignments Report", {
        align: "center",
      })

    doc.moveDown()

    const table = {
      headers: [
        "Student",
        "Team",
        "Program",
        "Type",
      ],

      rows: assignments.map((a) => [
        a.studentName || "",
        a.teamName || "",
        a.programName || "",
        a.programType || "",
      ]),
    }

    await doc.table(table)

    doc.end()

  } catch (err) {

    console.log(err)

    res.status(500).send("Error")

  }
})

// RESULTS PDF

router.get("/export/results", async (req, res) => {
  try {

    const results =
      await Result.find()

    const doc = new PDFDocument({
      margin: 20,
      size: "A4",
    })

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Results.pdf"
    )

    doc.pipe(res)

    doc
      .fontSize(20)
      .text("Results Report", {
        align: "center",
      })

    doc.moveDown()

    const table = {
      headers: [
        "Student",
        "Team",
        "Program",
        "Type",
        "Place",
        "Grade",
        "Points",
      ],

      rows: results.map((r) => [
        r.studentName || "",
        r.teamName || "",
        r.programName || "",
        r.programType || "",
        r.position || "",
        r.grade || "",
        String(r.points || ""),
      ]),
    }

    await doc.table(table)

    doc.end()

  } catch (err) {

    console.log(err)

    res.status(500).send("Error")

  }
})

module.exports = router