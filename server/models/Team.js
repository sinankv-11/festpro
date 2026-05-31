const mongoose = require("mongoose")

const teamSchema =
  new mongoose.Schema({

    organizationCode: {
      type: String,
      required: true,
    },

    teamName: String,

  })

module.exports =
  mongoose.model(
    "Team",
    teamSchema
  )