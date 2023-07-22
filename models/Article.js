const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  time: String,
  image: String,
  description: String,
  date: String,
  cloudinary_id: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("Article", articleSchema);
