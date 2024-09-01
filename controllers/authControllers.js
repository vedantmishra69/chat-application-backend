const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const saltRounds = 10;
const { SECRET_FOR_JWT } = require("../utils/constants")
const { v4: uuidv4 } = require("uuid")
const debug = require("debug")("app:controllers:auth")

exports.signUpUser = async (req, res) => {
  debug(req.body)
  try {
    const available = await User.findOne({ username: req.body.username })
    if (available) {
      res.status(409).json({ error: "Username already taken." })
      return
    }
  } catch (error) {
    debug(error)
    res.status(500).json({ error: "Some issue occured." })
    return
  }

  try {
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds)
    const room = uuidv4()
    const newUser = new User({
      username: req.body.username,
      password: hashedPass,
      room: room
    })
    await newUser.save()
    res.status(201).json({ message: "User added." })
  } catch (error) {
    debug(error)
    res.status(500).json({ error: "Couldn't add the user." })
  }
}

exports.signInUser = async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  try {
    const user = await User.findOne({ username: username })
    const match = await bcrypt.compare(password, user.password)
    if (!match) res.status(403).json({ error: "Wrong password" })
    else {
      const token = jwt.sign({ username: username }, SECRET_FOR_JWT, { expiresIn: "1h" })
      res.status(200).json({ token: token })
    }
  } catch (error) {
    debug(error)
    res.status(404).json({ error: "User not found." })
  }
}

exports.verifyUser = async (req, res) => {
  const token = req.headers['authorization']
  debug(token)
  jwt.verify(token, SECRET_FOR_JWT, (err, decoded) => {
    if (err) {
      debug(err)
      res.status(401).json({ error: err.name })
    } else res.status(200).json({ username: decoded.username })
  })
}