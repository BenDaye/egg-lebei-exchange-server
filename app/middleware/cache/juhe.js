'use strict';

const cacheManager = require('cache-manager');

module.exports = (options, app) => {
  return async function juheCacheMiddleware(ctx, next) {
    const multiCache = cacheManager.multiCaching([ app.cacheManager.get('mongooseJuhe') ]);
    ctx.cache = multiCache;
    await next();
  };
};
