const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    ["/api*"],
    createProxyMiddleware({
      target: "https://rise-blog-backend.onrender.com",
    })
  );
};
