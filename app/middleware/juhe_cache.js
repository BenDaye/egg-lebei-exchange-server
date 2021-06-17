'use strict';

module.exports = (options, app) => {
  return async function juheCacheMiddleware(ctx, next) {
    const needQuery = [ '/juhe/exchange/currency' ].some(v => ctx.URL.pathname.includes(v));
    const key = needQuery ? ctx.url.toLowerCase() : ctx.URL.pathname.toLowerCase();

    const cache = app.juheCache.get(key);

    if (cache) {
      ctx.onSuccess(cache);
      return;
    }

    await next();
  };
};
