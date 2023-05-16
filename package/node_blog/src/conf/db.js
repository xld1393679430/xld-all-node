const env = process.env.NODE_ENV;

let mysql_conf = {};
let redis_conf = {}

if (env === "production") {
  mysql_conf = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "myblog",
  };
  redis_conf = {
    port: 6379,
    host: '127.0.0.1'
  }
} else {
  mysql_conf = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "myblog",
  };
  redis_conf = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  mysql_conf,
  redis_conf,
};
