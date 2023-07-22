const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);
mongoose.model("User", userSchema);
