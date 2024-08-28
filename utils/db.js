const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { SECRET_FOR_JWT } = require("./constants")

exports.getUserList = async (req, res) => {
  let username = ""
  jwt.verify(req.headers.authorization, SECRET_FOR_JWT, async (err, decoded) => {
    if (err) {
      console.log(err)
      res.status(401).json({ error: err.name })
    } else {
      try {
        const userList = await User.find({ username: { $ne: decoded.username } }, "username")
        if (userList) res.status(200).json({ user_list: userList })
        else res.status(404).json({ error: "User list is empty" })
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: "unable to get data." })
      }
    }
  })

}