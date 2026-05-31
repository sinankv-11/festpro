const mongoose = require("mongoose")

const programTypeSchema = new mongoose.Schema({

  typeName: String,

})

module.exports = mongoose.model("ProgramType", programTypeSchema)