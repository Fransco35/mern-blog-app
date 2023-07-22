const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    ["/api*"],
    createProxyMiddleware({
      // target: "https://rise-blog-backend.onrender.com",
      target: "http://localhost:3001",
    })
  );
};
