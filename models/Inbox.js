const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InboxSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users", // user connected to inbox; can only delete own messages and displays which user created the message
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  messages: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Inbox = mongoose.model("inbox", InboxSchema);
