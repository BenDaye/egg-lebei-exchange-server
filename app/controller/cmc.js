'use strict';

const Controller = require('egg').Controller;

class CmcController extends Controller {
  async handleResponse(res) {
    const { data, status } = res;
    if (status === 200) return this.handleSuccess(data.data);

    this.ctx.onError(data.status.error_message);
    return;
  }

  async handleSuccess(data) {
    const key = this.ctx.url.toLowerCase();
    this.app.coinMarketCapCache.set(key, data);
    this.ctx.onSuccess(data);
    return;
  }

  async cryptoCurrencyListingsLatest() {
    try {
      const {
        start = 1,
        limit = 100,
        convert = 'USD',
        sort = 'date_added',
        sort_dir = 'asc',
      } = this.ctx.query;

      this.handleResponse(
        await this.ctx.curl(
          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            data: {
              start,
              limit,
              convert,
              sort,
              sort_dir,
            },
            dataAsQueryString: true,
            headers: {
              'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
            },
          }
        )
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async cryptoCurrencyMetadata() {
    try {
      const {
        id,
        slug,
        symbol,
        aux = 'urls,logo,description,tags,platform,date_added,notice',
      } = this.ctx.query;
      this.handleResponse(
        await this.ctx.curl(
          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', {
            data: { id, slug, symbol, aux },
            dataAsQueryString: true,
            headers: {
              'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
            },
          }
        )
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }

  async keyInfo() {
    try {
      this.handleResponse(
        await this.ctx.curl('https://pro-api.coinmarketcap.com/v1/key/info', {
          headers: {
            'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
          },
        })
      );
    } catch (err) {
      this.ctx.onError(err);
    }
  }
}

module.exports = CmcController;
