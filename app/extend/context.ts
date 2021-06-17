import { Context } from 'egg';
import Ccxt = require('ccxt');

export class CommonResponse {
  constructor(readonly status: number, readonly message: string, readonly data: any) { }
}

module.exports = {
  onSuccess(this: Context, data: any) {
    if (data instanceof CommonResponse) {
      this.body = data;
      return;
    }
    this.body = new CommonResponse(1, 'Success', data);
    return;
  },
  onError(this: Context, err: any) {
    this.logger.error(err);

    if (err instanceof Ccxt.NetworkError) {
      this.body = new CommonResponse(700, `NetworkError: ${err?.message}`, null);
      return;
    } else if (err instanceof Ccxt.ExchangeError) {
      this.body = new CommonResponse(701, `ExchangeError: ${err?.message}`, null);
      return;
    } else if (err instanceof CommonResponse) {
      this.body = err;
      return;
    } else if (err instanceof Error) {
      this.body = new CommonResponse(0, err?.message, null);
      return;
    } else if (typeof err === 'string') {
      this.body = new CommonResponse(0, err, null);
      return;
    }
    this.body = new CommonResponse(0, 'UnexpectedError', null);
    return;

  },
};
