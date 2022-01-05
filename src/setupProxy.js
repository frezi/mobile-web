// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require("http-proxy-middleware");
// ==== 代理
module.exports = function(app) {
  app.use(
    "/upload",
    proxy({
      target: "http://dev-shequ.ke.com/",
      changeOrigin: true
    })
  );
  app.use(
    "/cuser",
    proxy({
      target: "http://dev-shequ.ke.com/",
      changeOrigin: true
    })
  );
  app.use(
    "/bapis",
    proxy({
      target: "http://dev-shequ.ke.com/",
      changeOrigin: true
    })
  );
  
};
