const express = require("express");
const { signInUser, signUpUser, verifyUser } = require("../controllers/authControllers")

const router = express.Router();

router.get("/", (req, res) => res.send("hiiii"))

router.post("/signin", signInUser);

router.post("/signup", signUpUser);

router.get("/verify", verifyUser)

module.exports = router