module.exports = (socket) => {
  socket.on("message sent", (message, username) => {
    console.log("from " + socket.user + " to " + username)
    socket.to(username).emit("message received", message, socket.user)
  })
}