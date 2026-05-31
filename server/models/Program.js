const mongoose = require("mongoose")

const ProgramSchema =
  new mongoose.Schema({

    organizationCode: {
      type: String,
      required: true,
    },

    programName: String,

    programType: String,

    category: String,

  })

module.exports = mongoose.model("Program", ProgramSchema)