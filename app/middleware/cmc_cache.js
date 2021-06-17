'use strict';

module.exports = (options, app) => {
  return async function cmcCacheMiddleware(ctx, next) {
    const key = ctx.url.toLowerCase();

    const cache = app.coinMarketCapCache.get(key);

    if (cache) {
      ctx.onSuccess(cache);
      return;
    }

    await next();
  };
};
