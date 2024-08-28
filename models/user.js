const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: { type: String, required: true, maxLength: 16 },
  password: { type: String, required: true },
  room: { type: String, required: true }
})

module.exports = new mongoose.model("User", userSchema)