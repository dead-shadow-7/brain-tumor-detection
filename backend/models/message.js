// models/message.js
import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userMail: {
    type: String,
    required: true,
  },
  userMessage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
