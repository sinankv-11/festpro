const mongoose = require("mongoose")

const organizationSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
    },

    adminUsername: {
      type: String,
      required: true,
      unique: true,
    },

    adminPassword: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

  })

module.exports =
  mongoose.model(
    "Organization",
    organizationSchema
  )