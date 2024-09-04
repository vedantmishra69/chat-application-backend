const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { SECRET_FOR_JWT } = require("../utils/constants")
const { isOnline } = require("../socket/status")
const Message = require("../models/message")
const debug = require("debug")("app:controller:db")

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


exports.insertMessage = async (message, sender, receiver) => {
  const newMessage = new Message({ content: message, sender: sender, receiver: receiver })
  try {
    const savedMessage = await newMessage.save()
    debug("message saved")
    return savedMessage.offset
  } catch (error) {
    debug("couldn't store the message: " + error)
    throw (error)
  }
}


exports.retrieveMessage = async (req, res) => {
  jwt.verify(req.headers.authorization, SECRET_FOR_JWT, async (err, decoded) => {
    if (err) {
      debug(err)
      res.status(401).json({ error: err.name })
    } else {
      try {
        console.log(decoded.username, req.query.offset)
        const messages = await Message.
          find().
          or([{ sender: decoded.username }, { receiver: decoded.username }]).
          where("offset").gt(req.query.offset).
          sort("offset").
          select("content sender receiver offset").
          exec()
        debug(messages)
        res.status(200).json({ messages: messages })
      } catch (error) {
        res.status(500).json({ error: error })
        debug(error)
      }
    }
  })
}