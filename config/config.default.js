/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = (exports = {
    cluster: {
      listen: {
        port: 7001,
        hostname: '0.0.0.0',
      },
    },
    security: {
      csrf: false,
    },
    httpclient: {
      request: {
        dataType: 'json',
        timeout: 30 * 1000,
      },
    },
  });

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618727195323_813';

  // add your egg config in here
  // config.middleware = [ 'authenticated' ];

  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
