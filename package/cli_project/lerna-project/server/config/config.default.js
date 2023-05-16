/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1671204693097_9756';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false, // 关闭POST请求需要传递csrf的报错
    },
  };

  config.mongoose = {
    url: 'mongodb://admin:123456@127.0.0.1:27017/lerna-cli-xld',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
