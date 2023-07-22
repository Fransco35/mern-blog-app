const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// auth
const session = require("cookie-session");
const passport = require("passport");

require("./models/User");
require("./models/Article");
require("./auth/passport");

const User = mongoose.model("User");
const Article = mongoose.model("Article");

dotenv.config();

const cloudinary = require("./utils/cloudinary");
const upload = require("./utils/multer");

const corsOptions = {
  // origin: "https://riseblog.onrender.com",
  origin: "https://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 2 * 60 * 1000,
    },
  })
);

app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session());

//Database Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb is connected"))
  .catch((error) => console.log(error));

// GET ROUTES
app.get("/api/", async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ _id: -1 })
      .populate("userId", "fullname");
    res.status(200).json(articles);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/api/:articleId", async (req, res) => {
  try {
    const ObjectId = require("mongodb").ObjectId;
    const requestedArticleId = req.params.articleId;

    const article = await Article.findOne({
      _id: new ObjectId(requestedArticleId),
    }).populate("userId", "fullname");

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// POST ROUTES

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
          res.status(200).json({
            userId: req.user.id,
          });
        });
      }
    }
  );
});

app.get("/api/failed", (req, res) => {
  res.status(400).json({ message: "login unsuccessful" });
});

app.post(
  "/api/login",
  passport.authenticate("local", { failureRedirect: "/api/failed" }),
  function (req, res) {
    res.status(200).json({
      userId: req.user.id,
    });
  }
);

app.post("/api/addArticles", upload.single("image"), async (req, res) => {
  const date = new Date();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const newdate = `${day}/${month}/${year}`;

  const { title, time, description, userId } = req.body;

  try {
    const image = await cloudinary.uploader.upload(req.file.path);

    const article = new Article({
      title: title,
      time: time,
      image: image.secure_url,
      description: description,
      date: newdate,
      cloudinary_id: image.public_id,
      userId: userId,
    });

    await article.save();
    res.status(201).json({ message: "article created successfully" });
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/api/logout", async function (req, res, next) {
  try {
    req.logout(req.user, function (err) {
      if (err) {
        return next(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(200);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
