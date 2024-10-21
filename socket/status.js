const debug = require("debug")("app:socket:status")

const isOnline = new Set()

const status = (socket) => {
  if (socket.user) {
    isOnline.add(socket.user)
    console.log(socket.user)
    socket.broadcast.timeout(5000).emit("set online", socket.user, (err, username) => {
      if (err) debug(err)
      else debug(socket.user + " is received by " + username)
    })
    socket.on("isOnline", (username, cb) => cb(isOnline.has(username)))
    socket.on("disconnecting", () => {
      isOnline.delete(socket.user)
      socket.broadcast.timeout(5000).emit("set offline", socket.user, (err, username) => {
        if (err) debug(err)
        else debug(socket.user + " is received by " + username)
      })
    })
  }
}

module.exports = { isOnline, status }