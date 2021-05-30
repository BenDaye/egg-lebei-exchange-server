import { Controller } from 'egg';

export default class JuheController extends Controller {
  public async getExchangeRate() {
    try {
      const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/query?key=${process.env.JU_HE_EXCHANGE_API_KEY}`);
      if (error_code) {
        this.ctx.body = {
          status: 0,
          message: reason,
        };
      } else {
        const res = {
          status: 1,
          message: 'success',
          data: result.list,
        };
        this.app.juheCache.set('exchange', res);
        this.ctx.body = res;
      }
    } catch (err) {
      this.ctx.body = {
        status: 0,
        message: 'Error: Unexpected JuHeApi Error',
      };
    }
  }
}
