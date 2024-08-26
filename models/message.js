const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: { type: String, required: true, maxLength: 100 },
  sender: { type: String, required: true, maxLength: 16 },
  receiver: { type: String, required: true, maxLength: 16 }
})

module.exports = new mongoose.Model("Message", messageSchema)