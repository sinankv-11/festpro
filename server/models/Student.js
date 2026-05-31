const mongoose = require("mongoose")

const studentSchema =
  new mongoose.Schema({

    organizationCode: {
      type: String,
      required: true,
    },

    studentId: String,

    studentName: String,

    teamName: String,

    category: String,

  })

module.exports =
  mongoose.model(
    "Student",
    studentSchema
  )