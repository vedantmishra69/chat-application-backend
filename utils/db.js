const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { SECRET_FOR_JWT } = require("./constants")
const debug = require("debug")("app:utils:db")
const { isOnline } = require("../socket/status")

exports.getUserList = async (req, res) => {
  jwt.verify(req.headers.authorization, SECRET_FOR_JWT, async (err, decoded) => {
    if (err) {
      debug(err)
      res.status(401).json({ error: err.name })
    } else {
      try {
        const userList = await User.find({ username: { $ne: decoded.username } }, "username")
        if (userList) {
          const list = []
          for (const obj of userList) {
            const user = {
              name: obj.username,
              status: isOnline.has(obj.username) ? "online" : "offline"
            }
            list.push(user)
          }
          res.status(200).json({ user_list: list })
        }
        else res.status(404).json({ error: "User list is empty" })
      } catch (error) {
        debug(error)
        res.status(500).json({ error: "Unable to get data." })
      }
    }
  })

}