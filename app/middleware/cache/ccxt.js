'use strict';

const cacheManager = require('cache-manager');

module.exports = (options, app) => {
  return async function ccxtCacheMiddleware(ctx, next) {
    const multiCache = cacheManager.multiCaching([ app.cacheManager.get('mongooseCcxt'), app.cacheManager.get('redisCcxt') ]);
    ctx.cache = multiCache;
    await next();
  };
};
