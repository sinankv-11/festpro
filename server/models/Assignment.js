const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema({

  organizationCode: {
  type: String,
  required: true,
},

  studentName: String,

  teamName: String,

  category: String,

  programName: String,

  programType: String,

})

module.exports = mongoose.model("Assignment", assignmentSchema)