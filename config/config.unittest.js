/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = () => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    httpclient: {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        proxy: 'http://127.0.0.1:7890',
      },
    },
  });

  const userConfig = {
    passportJwt: {
      secret: 'local',
    },
  };

  return { ...config, ...userConfig };
};
