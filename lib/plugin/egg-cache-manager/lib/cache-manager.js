'use strict';

const assert = require('assert');

const mongoose = require('./mongoose');
const custom = require('./custom');
const memory = require('./memory');
const redis = require('./redis');

module.exports = app => {
  const { client, clients, store, ttl, max, host, port, auth, db, options } =
    app.config.cacheManager;

  if (!client && !clients && store)
    app.config.cacheManager.client = {
      store,
      ttl,
      max,
      host,
      port,
      auth,
      db,
      options,
    };

  app.addSingleton('cacheManager', create);
};

function create(config, app) {
  const { store } = config;
  assert(store, "[egg-cache-manager] 'store' is required");

  const supportedStore = [ 'memory', 'custom', 'mongoose', 'redis' ];
  assert(supportedStore.some(v => v === store), `[egg-cache-manager] 'store' must be one of [ ${supportedStore.join(' | ')} ]`);

  switch (store) {
    case 'memory': {
      return memory(config, app);
    }
    case 'custom': {
      return custom(config, app);
    }
    case 'mongoose': {
      return mongoose(config, app);
    }
    case 'redis': {
      return redis(config, app);
    }
    default:
      break;
  }
}
