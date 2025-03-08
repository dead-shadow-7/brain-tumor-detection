// controllers/messageController.js
import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
  try {
    const { userName, userMail, userMessage } = req.body;

    // Create new message
    const newMessage = new Message({
      userName,
      userMail,
      userMessage,
    });

    // Save message to database
    const savedMessage = await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
      data: savedMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save message",
      error: error.message,
    });
  }
};
