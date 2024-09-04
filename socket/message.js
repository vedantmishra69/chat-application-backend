const debug = require("debug")("app:socket:message")
const { insertMessage } = require("../controllers/dbController")

module.exports = async (socket) => {
  socket.on("message sent", async (_message, username, cb) => {
    debug("from " + socket.user + " to " + username)
    try {
      const offset = await insertMessage(_message, socket.user, username)
      cb(offset)
      const message = {
        content: _message,
        sender: socket.user,
        receiver: username,
        offset: offset
      }
      debug(`message ${message.content}-${message.offset} inserted in the database.`)
      socket.timeout(5000).to(message.receiver).emit("message received", message, (err, mess) => {
        if (err) debug(err)
        else debug("message received " + mess)
      })
    } catch (error) { debug(error) }
  })
}