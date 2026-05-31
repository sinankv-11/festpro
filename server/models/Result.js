const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({

  organizationCode: {
    type: String,
    required: true,
  },

  studentName: String,
  teamName: String,
  category: String,

  programName: String,
  programType: String,

  position: String,
  grade: String,

  points: Number,

  published: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model(
  "Result",
  resultSchema
)