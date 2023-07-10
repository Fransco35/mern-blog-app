const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// auth
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
//
dotenv.config();

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("node:path");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//Database Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb is connected"))
  .catch((error) => console.log(error));

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//multer config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpeg" && ext !== ".jpg") {
      cb(new Error("File is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

//Defined user schema
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//Defined article schema
const articleSchema = new mongoose.Schema({
  title: String,
  time: String,
  image: String,
  description: String,
  date: String,
  cloudinary_id: String,
});

const Article = mongoose.model("Article", articleSchema);
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    return done(null, await User.findById(id));
  } catch (error) {
    return done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/google/login",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          googleId: profile.id,
          fullname: profile.displayName,
          username: profile.emails[0].value,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

app.get("/api/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/api/google/failed", (req, res) => {
  res.status(400).json({ message: "user authentication failed" });
});

app.get(
  "/api/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/google/login",
  passport.authenticate("google", { failureRedirect: "/api/google/failed" }),
  (req, res) => {
    // Successful authentication, redirect.
    res.redirect("http://localhost:3000/success");
  }
);

app.get("/api/login/failed", (req, res) => {
  res.status(400).json({ message: "login failed" });
});

app.get("logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

app.post("/api/signup", (req, res) => {
  const { fullname, username, password } = req.body;

  User.register(
    { username: username, fullname: fullname },
    password,
    (err, user) => {
      if (err) {
        res.status(err.status);
        console.log(err.message);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.status(200).json({ message: "successfully authenticated" });
        });
      }
    }
  );
});

app.post("/api/addArticles", upload.single("image"), async (req, res) => {
  const date = new Date();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const newdate = `${day}/${month}/${year}`;

  const { title, time, description } = req.body;

  try {
    const image = await cloudinary.uploader.upload(req.file.path);

    const article = new Article({
      title: title,
      time: time,
      image: image.secure_url,
      description: description,
      date: newdate,
      cloudinary_id: image.public_id,
    });

    await article.save();
    res.status(201).json({ message: "article created successfully" });
  } catch (error) {
    res.json(error.message);
  }
});

app.delete("/api/:id", async (req, res) => {
  const requestedTaskId = req.params.id;
  try {
    const article = await Article.findById(requestedTaskId);
    await cloudinary.uploader.destroy(article.cloudinary_id);
    await article.deleteOne();
    res.json(article);
  } catch (error) {
    res.send(error.message);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
