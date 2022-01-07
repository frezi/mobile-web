// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require("http-proxy-middleware");
// ==== 代理
module.exports = function(app) {
  app.use(
    "/apis",
    proxy({
      target: "http://example.com",
      changeOrigin: true
    })
  );
};
