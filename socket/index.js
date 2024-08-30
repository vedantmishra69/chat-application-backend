const { SECRET_FOR_JWT } = require("../utils/constants")

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("someone connected")
    require("jsonwebtoken").verify(socket.handshake.auth.token, SECRET_FOR_JWT, (err, decoded) => {
      if (err) console.log(err)
      else {
        socket.user = decoded.username
        socket.join(socket.user)
      }
    })
    require("./status")(socket)
    require("./message")(socket)
  })
}