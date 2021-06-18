'use strict';

const assert = require('assert');
const cacheManager = require('cache-manager');

module.exports = (config, app) => {
  const { options, custom } = config;
  assert(
    custom, "[egg-cache-manager] [custom] ERROR 'custom' are required"
  );

  app.coreLogger.info('[egg-cache-manager] [custom] INIT');

  return cacheManager.caching({
    store: custom,
    ...options,
  });
};
