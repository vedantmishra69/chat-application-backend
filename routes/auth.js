const express = require("express");
const AuthController = require("../controllers/authControllers")

const router = express.Router();

router.get("/", (req, res) => res.send("hiiii"))

router.post("/signin", AuthController.signInUser);

router.post("/signup", AuthController.signUpUser);

router.post("/verify", AuthController.verifyUser)

module.exports = router