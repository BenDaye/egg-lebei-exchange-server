'use strict';

module.exports = (options, app) => {
  return async function ccxtCacheMiddleware(ctx, next) {
    const needQuery = [ '/tickers', '/ohlcv', '/market_ids' ].some(v => ctx.URL.pathname.includes(v));
    const key = needQuery ? ctx.url.toLowerCase() : ctx.URL.pathname.toLowerCase();

    const cache = app.ccxtCache.get(key);

    if (cache) {
      ctx.onSuccess(cache);
      return;
    }

    await next();
  };
};
