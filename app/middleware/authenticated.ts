import { Context } from 'egg';

export default function authenticated(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    console.log(ctx.isAuthenticated());

    if (ctx.isAuthenticated()) {
      await next();
    }

    ctx.throw(403);
  };
}
