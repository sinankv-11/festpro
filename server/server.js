require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const PDFDocument = require("pdfkit")

const organizationRoutes = require("./routes/organizations")
const authRoutes = require("./routes/auth")
const exportRoutes = require("./routes/exportRoutes")

const bcrypt = require("bcryptjs")

const Admin = require("./models/Admin")
const Student = require("./models/Student")
const Program = require("./models/Program")
const Assignment = require("./models/Assignment")
const Result = require("./models/Result")
const Team = require("./models/Team")
const Category = require("./models/Category")
const Type = require("./models/Type")
const Organization = require("./models/Organization")

const app = express()

app.use(exportRoutes)
app.use(cors())
app.use(express.json())
app.use(
  "/organizations",
  organizationRoutes
)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.send("Fest Manager API Running")
})


mongoose.connection.once("open", () => {
  console.log(
    "Database:",
    mongoose.connection.db.databaseName
  )
})

/* ==========================
   STUDENTS
========================== */

app.get("/students", async (req, res) => {
  try {

    const { organizationCode } =
      req.query

    const students =
      await Student.find({
        organizationCode,
      })

    res.json(students)

  } catch (err) {

    res.status(500).json(err)

  }
})

app.post("/students", async (req, res) => {
  try {

    const student =
      new Student(req.body)

    await student.save()

    res.json(student)

  } catch (err) {

    res.status(500).json(err)

  }
})

app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      {
        _id: req.params.id,
        organizationCode:
          req.body.organizationCode,
      },
      req.body,
      { new: true }
    )
    res.json(student)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findOneAndDelete({
      _id: req.params.id,
      organizationCode:
        req.body.organizationCode,
    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json(err)
  }
})

/* ==========================
   PROGRAMS
========================== */

app.get("/programs", async (req, res) => {
  try {

    const { organizationCode } =
      req.query

    const programs =
      await Program.find({
        organizationCode,
      })

    res.json(programs)

  } catch (err) {

    res.status(500).json(err)

  }
})

app.post("/programs", async (req, res) => {
  try {
    const program = new Program(req.body)
    await program.save()
    res.json(program)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.put("/programs/:id", async (req, res) => {
  try {
    const program =
      await Program.findOneAndUpdate(

        {
          _id: req.params.id,
          organizationCode:
            req.body.organizationCode,
        },

        {
          programName:
            req.body.programName,

          programType:
            req.body.programType,

          category:
            req.body.category,
        },

        { new: true }

      )
    res.json(program)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.delete("/programs/:id", async (req, res) => {
  try {
    await Program.findOneAndDelete({

      _id: req.params.id,

      organizationCode:
        req.body.organizationCode,

    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json(err)
  }
})

/* ==========================
   ASSIGNMENTS
========================== */

app.get("/assignments", async (req, res) => {
  try {

    const { organizationCode } =
      req.query

    const assignments =
      await Assignment.find({
        organizationCode,
      })

    res.json(assignments)

  } catch (err) {

    res.status(500).json(err)

  }
})

app.post("/assignments", async (req, res) => {
  try {
    const assignment = new Assignment(req.body)
    await assignment.save()
    res.json(assignment)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.put("/assignments/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(

      {
        _id: req.params.id,
        organizationCode:
          req.body.organizationCode,
      },

      req.body,

      { new: true }

    )
    res.json(assignment)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.delete("/assignments/:id", async (req, res) => {
  try {
    await Assignment.findOneAndDelete({

      _id: req.params.id,

      organizationCode:
        req.body.organizationCode,

    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json(err)
  }
})

/* ==========================
   RESULTS
========================== */

app.get("/results", async (req, res) => {
  try {

    const { organizationCode } =
      req.query

    const results =
      await Result.find({
        organizationCode,
      })

    res.json(results)

  } catch (err) {

    res.status(500).json(err)

  }
})

app.post("/results", async (req, res) => {
  try {
    const result = new Result(req.body)
    await result.save()
    res.json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.put("/results/:id", async (req, res) => {
  try {
    const result = await Result.findOneAndUpdate(

      {
        _id: req.params.id,
        organizationCode:
          req.body.organizationCode,
      },

      req.body,

      { new: true }

    )
    res.json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.delete("/results/:id", async (req, res) => {
  try {
    await Result.findOneAndDelete({

      _id: req.params.id,

      organizationCode:
        req.body.organizationCode,

    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json(err)
  }
})

/* ==========================
   PUBLISH RESULT
========================== */

app.put("/results/publish/:id", async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      { published: true },
      { new: true }
    )

    res.json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

/* ==========================
   STUDENT PAGE APIs
========================== */

app.get("/published-results", async (req, res) => {
  try {
    const { organizationCode } =
      req.query

    const results =
      await Result.find({
        organizationCode,
        published: true,
      })

    res.json(results)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.get("/leaderboard", async (req, res) => {
  try {
    const { organizationCode } =
      req.query

    const results =
      await Result.find({
        organizationCode,
        published: true,
      })

    const teams = {}

    results.forEach((r) => {
      if (!teams[r.teamName]) {
        teams[r.teamName] = 0
      }

      teams[r.teamName] += Number(r.points || 0)
    })

    const leaderboard = Object.keys(teams)
      .map((team) => ({
        teamName: team,
        totalPoints: teams[team],
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints)

    res.json(leaderboard)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.get("/top-scorers", async (req, res) => {
  try {
    const { organizationCode } =
      req.query

    const results =
      await Result.find({
        organizationCode,
        published: true,
      })
    const students = {}

    results.forEach((r) => {
      if (!students[r.studentName]) {
        students[r.studentName] = {
          studentName: r.studentName,
          teamName: r.teamName,
          totalPoints: 0,
        }
      }

      students[r.studentName].totalPoints += Number(
        r.points || 0
      )
    })

    const topScorers = Object.values(students)
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 3)

    res.json(topScorers)
  } catch (err) {
    res.status(500).json(err)
  }
})

/* ==========================
   TEAMS
========================== */

app.get("/teams", async (req, res) => {
  try {

    const { organizationCode } =
      req.query

    const teams =
      await Team.find({
        organizationCode,
      })

    res.json(teams)

  } catch (err) {

    res.status(500).json({
      error: err.message,
    })

  }
})

// ADD TEAM
app.post("/teams", async (req, res) => {
  try {

    const team = new Team({
      organizationCode:
        req.body.organizationCode,

      teamName:
        req.body.teamName,
    })

    await team.save()

    res.json(team)

  } catch (err) {

    res.status(500).json({
      error: err.message,
    })

  }
})

// UPDATE TEAM
app.put("/teams/:id", async (req, res) => {
  try {

    const team =
      await Team.findByIdAndUpdate(

        req.params.id,

        {
          teamName:
            req.body.teamName,
        },

        { new: true }

      )

    res.json(team)

  } catch (err) {

    res.status(500).json({
      error: err.message,
    })

  }
})

// DELETE TEAM
app.delete("/teams/:id", async (req, res) => {
  try {

    await Team.findByIdAndDelete(
      req.params.id
    )

    res.json({
      success: true,
    })

  } catch (err) {

    res.status(500).json({
      error: err.message,
    })

  }
})

/* ==========================
   CATEGORIES
========================== */

app.get("/categories", async (req, res) => {
  try {

    const { organizationCode } =
      req.query

    const categories =
      await Category.find({
        organizationCode,
      })

    res.json(categories)

  } catch (err) {

    res.status(500).json({
      error: err.message,
    })

  }
})

// ADD CATEGORY
app.post("/categories", async (req, res) => {
  try {

    const category =
      new Category({

        organizationCode:
          req.body.organizationCode,

        categoryName:
          req.body.categoryName,

      })

    await category.save()

    res.json(category)

  } catch (err) {

    res.status(500).json({
      error: err.message,
    })

  }
})

// UPDATE CATEGORY
app.put("/categories/:id", async (req, res) => {
  try {

    const category =
      await Category.findByIdAndUpdate(

        req.params.id,

        {
          categoryName:
            req.body.categoryName,
        },

        { new: true }

      )

    res.json(category)

  } catch (err) {

    res.status(500).json({
      error: err.message,
    })

  }
})

// DELETE CATEGORY
app.delete("/categories/:id", async (req, res) => {
  try {

    await Category.findByIdAndDelete(
      req.params.id
    )

    res.json({
      success: true,
    })

  } catch (err) {

    res.status(500).json({
      error: err.message,
    })

  }
})

/* ==========================
   TYPES
========================== */

// GET ALL TYPES
app.get("/types", async (req, res) => {
  try {

    const { organizationCode } =
      req.query

    const data =
      await Type.find({
        organizationCode,
      })

    res.json(data)

  } catch (err) {

    res.status(500).json({
      message: err.message,
    })

  }
})

// ADD TYPE
app.post("/types", async (req, res) => {
  try {

    const newType =
      new Type({

        organizationCode:
          req.body.organizationCode,

        typeName:
          req.body.typeName,

      })

    const saved =
      await newType.save()

    res.json(saved)

  } catch (err) {

    res.status(500).json({
      message: err.message,
    })

  }
})

// UPDATE TYPE
app.put("/categories/:id", async (req, res) => {
  try {
    const category =
      await Category.findByIdAndUpdate(
        req.params.id,
        {
          categoryName:
            req.body.categoryName,
        },
        { new: true }
      )

    res.json(category)
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
})

// DELETE TYPE
app.delete("/categories/:id", async (req, res) => {
  try {

    await Category.findByIdAndDelete(
      req.params.id
    )

    res.json({
      success: true,
    })

  } catch (err) {

    res.status(500).json({
      error: err.message,
    })

  }
})


/* ==========================
   PDF ROUTES
========================== */

// Students

app.get("/export/students", async (req, res) => {

  try {

    console.log("Students export called")

    const students = await Student.find()

    console.log(students.length)

    res.json(students)

  } catch (err) {

    console.log(err)

    res.status(500).json(err)

  }

})

// Programs



// Teams

app.get("/export/teams", async (req, res) => {

  try {

    const teams =
      await Team.find()

    const doc =
      new PDFDocument()

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=teams.pdf"
    )

    doc.pipe(res)

    doc
      .fontSize(20)
      .text("Teams Report")

    doc.moveDown()

    teams.forEach(
      (team, index) => {

        doc.text(
          `${index + 1}. ${team.teamName}`
        )

      }
    )

    doc.end()

  } catch (err) {

    res.status(500).json(err)

  }

})

// Assignment

app.get("/export/assignments", async (req, res) => {

  try {

    const assignments =
      await Assignment.find()

    const doc =
      new PDFDocument()

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=assignments.pdf"
    )

    doc.pipe(res)

    doc
      .fontSize(20)
      .text("Assignments Report")

    doc.moveDown()

    assignments.forEach(
      (item, index) => {

        doc.text(
          `${index + 1}. ${item.studentName} | ${item.programName} | ${item.teamName}`
        )

      }
    )

    doc.end()

  } catch (err) {

    res.status(500).json(err)

  }

})

// Results

app.get("/export/results", async (req, res) => {

  try {

    const results =
      await Result.find()

    const doc =
      new PDFDocument()

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=results.pdf"
    )

    doc.pipe(res)

    doc
      .fontSize(20)
      .text("Results Report")

    doc.moveDown()

    results.forEach(
      (result, index) => {

        doc.text(
          `${index + 1}. ${result.studentName} | ${result.programName} | ${result.points} Points`
        )

      }
    )

    doc.end()

  } catch (err) {

    res.status(500).json(err)

  }

})

/* ==========================
   ORGANIZATIONS
========================== */

app.get(
  "/organizations",
  async (req, res) => {

    try {

      const organizations =
        await Organization.find()

      res.json(organizations)

    } catch (err) {

      res.status(500).json(err)

    }

  }
)

app.post(
  "/organizations",
  async (req, res) => {

    try {

      const {
        name,
        code,
        adminUsername,
        adminPassword,
      } = req.body

      const organization =
        new Organization({

          name,
          code,
          adminUsername,
          adminPassword,

        })

      await organization.save()

      const hashedPassword =
  await bcrypt.hash(
    adminPassword,
    10
  )

const admin =
  new Admin({

    organizationCode: code,

    name: name,

    username: adminUsername,

    password: hashedPassword,

    role: "admin",

  })

await admin.save()

      res.json({
        message:
          "Organization created",
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({
        error: err.message,
      })

    }

  }
)

app.delete(
  "/organizations/:id",
  async (req, res) => {

    try {

      await Organization.findByIdAndDelete(
        req.params.id
      )

      res.json({
        message:
          "Organization deleted",
      })

    } catch (err) {

      res.status(500).json(err)

    }

  }
)



/* ==========================
   START SERVER
========================== */

const PORT = process.env.PORT || 5000

app.use("/api/auth", authRoutes)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
