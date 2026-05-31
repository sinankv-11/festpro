require("dotenv").config()

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const Admin = require("./models/Admin")

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {

    const existing =
      await Admin.findOne({
        username: "admin",
      })

    if (existing) {

      console.log(
        "Admin already exists"
      )

      process.exit()

    }

    const hash =
      await bcrypt.hash(
        "123456",
        10
      )

    await Admin.create({
      name: "Super Admin",
      username: "admin",
      password: hash,
      role: "superadmin",
    })

    console.log(
      "Admin Created Successfully"
    )

    process.exit()

  })
  .catch((err) => {

    console.log(err)

  })