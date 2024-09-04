const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: { type: String, required: true, maxLength: 100 },
  sender: { type: String, required: true, maxLength: 16 },
  receiver: { type: String, required: true, maxLength: 16 },
  offset: { type: Number, unique: true }
})

messageSchema.plugin(AutoIncrement, { inc_field: 'offset' });

module.exports = new mongoose.model("Message", messageSchema)