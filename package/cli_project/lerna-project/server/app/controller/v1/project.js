/* eslint-disable no-empty-function */
/* eslint-disable quotes */
const { Controller } = require("egg");

const ADD_TEMPLATE = [
  {
    name: "Vue项目模板",
    value: "vue-template",
    npmName: "@xld_template/vue-template",
    version: "latest",
  },
  {
    name: "React项目模板",
    value: "react-template",
    npmName: "@xld_template/react-template",
    version: "latest",
  },
  {
    name: "Vue-Element-Admin项目模板",
    value: "vue-element-admin-template",
    npmName: "@xld_template/vue-element-admin-template",
    version: "latest",
  },
];

class ProjectController extends Controller {
  // 项目模板查询
  async index() {
    const { ctx } = this;
    const res = await ctx.model.Project.find({});
    ctx.body = res;
  }

  // 根据项目模板id查询 /:id
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.model.Project.find({ value: id });
    if (res?.length) {
      ctx.body = res[0];
    } else {
      ctx.body = `<h2>没有找到${id}的模板</h2>`;
    }
  }

  // 项目模板新增
  async create() {
    this.ctx.body = "create";
    this.ctx.model.Project.create({
      name: "111",
      value: "222",
    });
  }

  // 项目模板更新
  async update() {}

  // 删除模板更新
  async destroy() {}
}

module.exports = ProjectController;
