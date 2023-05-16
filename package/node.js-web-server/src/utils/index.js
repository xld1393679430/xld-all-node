const { SuccessModel, ErrorModel } = require("../model/resModel");

const hanldePostData = (req) => {
  const promise = new Promise((resolve, rejecy) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });

    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });

  return promise;
};

const setCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

// 后端设置cookie
// 注意：1,设置path=/, 2, httpOnly 表示只允许后端更改 不允许前端通过document.cookie去更改cookie
const setCookie = (res, { username, userId }) => {
  let customCookie = "";
  if (username) {
    customCookie += `username=${username};`;
  } else if (userId) {
    customCookie += `userid=${userId};`;
  }
  res.setHeader(
    "Set-Cookie",
    `${customCookie} path=/; httpOnly; expires=${setCookieExpires()}`
  );
};

// 统一的登录验证
const logingCheck = (req) => {
  if (!req.session.username) {
    // return Promise.reject(new ErrorModel());
    return false
  }
  return true
};

module.exports = {
  hanldePostData,
  setCookieExpires,
  setCookie,
  logingCheck,
};
