'use strict';

module.exports = agent => {
  if (agent.config.cacheManager.agent) require('./lib/cache-manager')(agent);
};
