const mysql = require("mysql");
const { mysql_conf } = require("../conf/db");
// 创建链接对象
const connection = mysql.createConnection(mysql_conf);

// 开始链接
connection.connect();

// 执行sql语句
function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

module.exports = {
  exec,
};
