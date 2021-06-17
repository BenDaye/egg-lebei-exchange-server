'use strict';

const ccxt = require('ccxt');

class CommonResponse {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

module.exports = {
  onSuccess(data) {
    if (data instanceof CommonResponse) {
      this.body = data;
      return;
    }
    this.body = new CommonResponse(1, 'Success', data);
    return;
  },
  onError(err) {
    this.logger.error(err);

    if (err instanceof ccxt.NetworkError) {
      this.body = new CommonResponse(700, `NetworkError: ${err.message}`, null);
      return;
    } else if (err instanceof ccxt.ExchangeError) {
      this.body = new CommonResponse(701, `ExchangeError: ${err.message}`, null);
      return;
    } else if (err instanceof CommonResponse) {
      this.body = err;
      return;
    } else if (err instanceof Error) {
      this.body = new CommonResponse(0, err.message, null);
      return;
    } else if (typeof err === 'string') {
      this.body = new CommonResponse(0, err, null);
      return;
    }
    this.body = new CommonResponse(0, 'UnexpectedError', null);
    return;

  },
};
