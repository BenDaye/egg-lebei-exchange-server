'use strict';

const cacheManager = require('cache-manager');

module.exports = (config, app) => {
  const { options, ttl, max } = config;
  app.coreLogger.info('[egg-cache-manager] [memory] INIT');

  return cacheManager.caching({
    store: 'memory',
    ttl,
    max,
    ...options,
  });
};
