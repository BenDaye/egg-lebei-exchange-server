import { Application, Context } from 'egg';

export default function juheCacheMiddleware(app: Application): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const needQuery = [ '/juhe/exchange/currency' ].some(v => ctx.URL.pathname.includes(v));
    const key = needQuery ? ctx.url.toLowerCase() : ctx.URL.pathname.toLowerCase();

    const cache = app.juheCache.get(key);

    if (cache) {
      ctx.onSuccess(cache);
      return;
    }

    await next();
  };
}
