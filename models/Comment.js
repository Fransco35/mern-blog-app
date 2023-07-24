const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
});

mongoose.model("Comment", commentSchema);
