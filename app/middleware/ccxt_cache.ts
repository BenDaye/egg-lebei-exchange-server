import { Application, Context } from 'egg';

export default function ccxtCacheMiddleware(app: Application): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const key = ctx.url.toLowerCase();

    const cache = app.ccxtCache.get(key);

    if (cache) {
      ctx.body = cache;
      return;
    }

    await next();
  };
}
