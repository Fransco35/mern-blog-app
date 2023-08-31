const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    ["/api*"],
    createProxyMiddleware({
      target: "https://thoughtful-worm-tweed-jacket.cyclic.app",
    })
  );
};
