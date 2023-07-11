const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("http://localhost:3000/login");
  }
};

module.exports = loggedIn;
