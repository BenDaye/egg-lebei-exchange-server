'use strict';

module.exports = app => {
  if (app.config.cacheManager.app) require('./lib/cache-manager')(app);
};
