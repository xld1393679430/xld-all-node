const {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { logingCheck } = require("../utils");

const handleBolgRouter = (req, res) => {
  const { method, path } = req;

  // 获取博客列表
  if (method === "GET" && path === "/api/blog/list") {
    const { author, keyword } = req.query || {};
    return getList(author, keyword).then((list) => {
      return new SuccessModel(list);
    });
  }

  // 获取博客详情
  if (method === "GET" && path === "/api/blog/detail") {
    const { id } = req.query || {};
    return getDetail(id).then((detail) => {
      return new SuccessModel(detail);
    });
  }

  // 新建博客
  if (method === "POST" && path === "/api/blog/new") {
    const { body } = req;
    const isLogin = logingCheck(req);
    if (!isLogin) {
      return new ErrorModel("请先去登录");
    }
    req.body.author = req.session.username;
    return createBlog(body).then((blog) => {
      return new SuccessModel(blog);
    });
  }

  // 更新博客
  if (method === "POST" && path === "/api/blog/update") {
    const {
      query: { id },
      body,
    } = req;
    const isLogin = logingCheck(req);
    if (!isLogin) {
      return new ErrorModel("请先去登录");
    }
    return updateBlog(id, body).then((flag) => {
      if (flag) {
        return new SuccessModel(flag);
      }
      return new ErrorModel("更新博客失败");
    });
  }

  // 删除博客
  if (method === "POST" && path === "/api/blog/delete") {
    const { id } = req.query;
    const isLogin = logingCheck(req);
    if (!isLogin) {
      return new ErrorModel("请先去登录");
    }
    const author = req.session.username;
    return deleteBlog(id, author).then((flag) => {
      if (flag) {
        return new SuccessModel(flag, "删除成功");
      }
      return new ErrorModel("删除博客失败");
    });
  }
};

module.exports = handleBolgRouter;
