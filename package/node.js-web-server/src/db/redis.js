const redis = require("redis");
const { redis_conf } = require("../conf/db");
const { port, host } = redis_conf;

// 创建redis客户端
const redisClient = redis.createClient(port, host);
redisClient.on("error", (error) => {
  console.error(error);
});

function setRedis(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  redisClient.set(key, value);
}

function getRedis(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        reject(error);
        return;
      }
      if (value === null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(value));
      } catch (error) {
        resolve(value);
      }
    });
  });
}

module.exports = {
  setRedis,
  getRedis,
};
