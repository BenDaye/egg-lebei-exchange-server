'use strict';

const LRUCache = require('lru-cache');

module.exports = app => {
  if (app.config.lruCache.app) app.addSingleton('lruCache', config => new LRUCache(config));
};
