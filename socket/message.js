const debug = require("debug")("app:socket:message")

module.exports = (socket) => {
  socket.on("message sent", (message, username, cb) => {
    debug("from " + socket.user + " to " + username)
    socket.timeout(5000).to(username).emit("message received", message, socket.user, (err, mess) => {
      if (err) debug(err)
      else debug("message received " + mess)
    })
    cb()
  })
}