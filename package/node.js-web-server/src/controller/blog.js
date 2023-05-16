const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createTime desc`;
  return exec(sql);
};

const getDetail = (id) => {
  const sql = `select * from blogs where id = '${id}'`;
  return exec(sql).then((rows) => rows[0]);
};

const createBlog = (blog = {}) => {
  const { title, content, author } = blog;
  const createTime = Date.now();
  const sql = `
    insert into blogs (title, content, createTime, author)
    values ('${title}', '${content}', ${createTime}, '${author}')
  `;

  return exec(sql).then((res) => {
    return {
      id: res.insertId,
    };
  });
};

const updateBlog = (id, blog = {}) => {
  const { title, content } = blog;
  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;
  return exec(sql).then((res) => {
    return res.affectedRows > 0;
  });
};

const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'`;
  return exec(sql).then((res) => {
    return res.affectedRows > 0;
  });
};

module.exports = {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog,
};
