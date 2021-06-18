'use strict';

const Service = require('egg').Service;

class CacheService extends Service {
  get(cacheId, cacheKey, getDataFunction) {
    return this.ctx.app.cacheManager.get(cacheId).wrap(cacheKey, getDataFunction);
  }
  reset(cacheId) {
    return this.ctx.app.cacheManager.get(cacheId).reset();
  }
  getFromCtx(cacheKey, getDataFunction, ttl = 3600) {
    return this.ctx.cache.wrap(cacheKey, getDataFunction, { ttl });
  }
}

module.exports = CacheService;
