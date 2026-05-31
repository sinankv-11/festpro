const express = require("express")

const router =
  express.Router()

const Organization =
  require("../models/Organization")

// GET ALL

router.get("/", async (req, res) => {

  const data =
    await Organization.find()

  res.json(data)

})

// ADD

router.post("/", async (req, res) => {

  const org =
    await Organization.create(
      req.body
    )

  res.json(org)

})

// DELETE

router.delete("/:id",
  async (req, res) => {

    await Organization.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message: "Deleted",
    })

  })

module.exports = router