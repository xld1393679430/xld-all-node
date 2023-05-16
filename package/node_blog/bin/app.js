const qs = require("querystring");
const handleUserRouter = require("../src/router/user");
const handleBolgRouter = require("../src/router/blog");
const { hanldePostData, setCookie } = require("../src/utils");
const { getRedis, setRedis } = require("../src/db/redis");

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  // 设置path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = qs.parse(url.split("?")[1]);

  // 处理cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) {
      return;
    }
    const key = item.slice(0, item.indexOf("=")).trim();
    const value = item.slice(item.indexOf("=") + 1).trim();
    req.cookie[key] = value;
  });

  // 解析session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化session
    setRedis(userId, {});
  }
  // 获取 session
  req.sessionId = userId;
  getRedis(req.sessionId)
    .then((session) => {
      if (session === null) {
        // 初始化 Redis中的session
        setRedis(req.sessionId, {});
        // 设置session
        req.session = {};
      } else {
        req.session = session;
      }

      return hanldePostData(req);
    })
    .then((postData) => {
      // 处理post数据
      req.body = postData;

      // 处理博客路由
      const blogRes = handleBolgRouter(req, res);
      if (blogRes) {
        blogRes.then((data) => {
          if (needSetCookie) {
            setCookie(res, { userId });
          }
          res.end(JSON.stringify(data));
        });
        return;
      }

      // 处理用户路由
      const userRes = handleUserRouter(req, res);
      if (userRes) {
        userRes.then((data) => {
          if (needSetCookie) {
            setCookie(res, { userId });
          }
          res.end(JSON.stringify(data));
        });
        return;
      }

      // 未命中 404
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 not found");
      res.end();
    });
};

module.exports = serverHandle;
