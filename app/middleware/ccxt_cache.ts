import { Application, Context } from 'egg';

export default function ccxtCacheMiddleware(app: Application): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const needQuery = [ '/tickers', '/ohlcv', '/market_ids' ].some(v => ctx.URL.pathname.includes(v));
    const key = needQuery ? ctx.url.toLowerCase() : ctx.URL.pathname.toLowerCase();

    const cache = app.ccxtCache.get(key);

    if (cache) {
      ctx.onSuccess(cache);
      return;
    }

    await next();
  };
}
