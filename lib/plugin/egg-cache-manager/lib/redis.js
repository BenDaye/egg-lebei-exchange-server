'use strict';

// const assert = require('assert');
const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis');

module.exports = (config, app) => {
  const { host, port, auth, db, options, ttl } = config;

  // assert(
  //   host && port, "[egg-cache-manager] [redis] ERROR 'host && port' are required"
  // );

  app.coreLogger.info(
    '[egg-cache-manager] [redis] CONNECTING'
  );

  const redisCache = cacheManager.caching({
    store: redisStore,
    host,
    port,
    auth_pass: auth,
    db,
    ttl,
    ...options,
  });

  redisCache.store.events.on('redisError', err => {
    err.message = `[egg-cache-manager] [redis] ERROR ==> ${err.message}`;
    app.coreLogger.error(err);
  });

  return redisCache;
};
