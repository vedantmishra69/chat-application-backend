const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');


const SECRET_FOR_JWT = uuidv4()

exports.signUpUser = async (req, res) => {
  console.log(req.body)
  try {
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds)
    const newUser = new User({
      username: req.body.username,
      password: hashedPass
    })
    await newUser.save()
    res.status(201).json({ message: "User added." })
  } catch (error) {
    console.log(error)
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
    console.log(error)
    res.status(404).json({ error: "User not found." })
  }
}

exports.verifyUser = async (req, res) => {
  console.log(req.body.token)
  jwt.verify(req.body.token, SECRET_FOR_JWT, (err, decoded) => {
    if (err) {
      console.log(err)
      res.status(401).json({ error: err.name })
    } else res.status(200).json({ message: "Welcome" + decoded.username })
  })
}