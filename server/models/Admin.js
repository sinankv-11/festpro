const mongoose = require("mongoose")

const adminSchema =
  new mongoose.Schema({

    organizationCode: {
      type: String,
      required: true,
    },

    name: String,

    username: String,

    password: String,

    role: {
      type: String,
      default: "admin",
    },

  })

module.exports =
  mongoose.model(
    "Admin",
    adminSchema
  )