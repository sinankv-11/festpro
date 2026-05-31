const mongoose = require("mongoose")

const categorySchema =
  new mongoose.Schema({

    organizationCode: {
      type: String,
      required: true,
    },

    categoryName: String,

  })

module.exports =
  mongoose.model(
    "Category",
    categorySchema
  )