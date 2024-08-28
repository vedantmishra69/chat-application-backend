const { io } = require("../bin/www")

const isOnline = new Set()

module.exports = (socket) => {
  if (socket.user) {
    socket.on("im on", () => {
      isOnline.add(socket.user)
      socket.broadcast.emit("set online", socket.user)
    })
    socket.on("isOnline", (username, cb) => cb(isOnline.has(username)))
    socket.on("disconnecting", () => {
      isOnline.delete(socket.user)
      socket.broadcast.emit("set offline", socket.user)
    })
  }
}