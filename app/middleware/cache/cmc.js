'use strict';

const cacheManager = require('cache-manager');

module.exports = (options, app) => {
  return async function cmcCacheMiddleware(ctx, next) {
    const multiCache = cacheManager.multiCaching([ app.cacheManager.get('mongooseCMC') ]);
    ctx.cache = multiCache;
    await next();
  };
};
