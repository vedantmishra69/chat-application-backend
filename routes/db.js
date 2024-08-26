const express = require("express")
const { getUserList } = require("../utils/db")
const router = express.Router()

router.get("/userlist", getUserList)

module.exports = router