import { Application, Context } from 'egg';

export default function coinMarketCapCacheMiddleware(app: Application) :any {
  return async (ctx: Context, next:() => Promise<any>) => {
    const key = ctx.url.toLowerCase();

    const cache = app.coinMarketCapCache.get(key);

    if (cache) {
      ctx.body = cache;
      return;
    }

    await next();
  };
}
