import { Controller } from 'egg';

export default class JuheController extends Controller {
  public async handleSuccess(data) {
    const result = {
      status: 1,
      message: 'success',
      data,
    };
    const key = this.ctx.url.toLowerCase();
    this.app.juheCache.set(key, result);
    this.ctx.body = result;
    return;
  }
  public async handleError(e) {
    this.ctx.body = {
      status: 0,
      message: `Error: Unexpected JuHeApi Error ${e.message}`,
    };
    return;
  }

  public async getExchangeQuery() {
    try {
      const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/query?key=${process.env.JU_HE_EXCHANGE_API_KEY}`);
      if (error_code) {
        this.handleError(new Error(reason));
      } else {
        this.handleSuccess(result.list);
      }
    } catch (err) {
      this.handleError(err);
    }
  }
  public async getExchangeList() {
    try {
      const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/list?key=${process.env.JU_HE_EXCHANGE_API_KEY}`);
      if (error_code) {
        this.handleError(new Error(reason));
      } else {
        this.handleSuccess(result.list);
      }
    } catch (err) {
      this.handleError(err);
    }
  }
  public async getExchangeCurrency() {
    try {
      const { from, to } = this.ctx.query;
      const { data: { reason, result, error_code } } = await this.ctx.curl(`https://op.juhe.cn/onebox/exchange/currency?key=${process.env.JU_HE_EXCHANGE_API_KEY}&from=${from}&to=${to}`);
      if (error_code) {
        this.handleError(new Error(reason));
      } else {
        this.handleSuccess(result);
      }
    } catch (err) {
      this.handleError(err);
    }
  }
}
