const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Admin = require("../models/Admin")
const Organization = require("../models/Organization")

const router = express.Router()

router.post("/login", async (req, res) => {
    try {
        const {
            organizationCode,
            username,
            password,
        } = req.body

        const organization =
            await Organization.findOne({

                code: organizationCode,

                adminUsername: username,

            })

        if (!organization) {

            return res.status(401).json({

                message: "Invalid username",

            })

        }

        if (
            organization.adminPassword !==
            password
        ) {

            return res.status(401).json({

                message: "Invalid password",

            })

        }

        const token = jwt.sign(
            {
                id: organization._id,

                username:
                    organization.adminUsername,

                organizationCode:
                    organization.code,

                role: "admin",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        )

        res.json({
            token,
            username:
                organization.adminUsername,
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: "Server Error",
        })
    }
})

module.exports = router

router.get("/login", (req, res) => {
    res.send("Auth Route Working")
})