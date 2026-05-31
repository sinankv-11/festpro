const mongoose = require("mongoose")

const TypeSchema =
  new mongoose.Schema({

    organizationCode: {
      type: String,
      required: true,
    },

    typeName: String,

  })

module.exports =
  mongoose.model(
    "Type",
    TypeSchema
  )