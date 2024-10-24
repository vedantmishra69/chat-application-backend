const { SECRET_FOR_JWT } = require("../utils/constants")
const debug = require("debug")("app:socket:index")
const { status } = require("./status")
const { retrieveMessage } = require("../controllers/dbController")

module.exports = (io) => {
  io.on("connection", async (socket) => {
    debug("someone connected")
    require("jsonwebtoken").verify(socket.handshake.auth.token, SECRET_FOR_JWT, (err, decoded) => {
      if (err) debug(err)
      else {
        socket.user = decoded.username
        debug(socket.user + " connected")
        socket.join(socket.user)
      }
    })
    status(socket)
    require("./message")(socket)
  })
}