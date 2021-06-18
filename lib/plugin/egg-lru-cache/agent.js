'use strict';

const LRUCache = require('lru-cache');

module.exports = agent => {
  if (agent.config.lruCache.agent) agent.addSingleton('lruCache', config => new LRUCache(config));
};
