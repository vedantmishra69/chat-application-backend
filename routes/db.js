const express = require("express")
const { getUserList, retrieveMessage } = require("../controllers/dbController")
const router = express.Router()

router.get("/userlist", getUserList)

router.get("/messages", retrieveMessage)

module.exports = router