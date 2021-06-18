'use strict';

const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  lruCache: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-lru-cache'),
  },
  cacheManager: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-cache-manager'),
  },
};
