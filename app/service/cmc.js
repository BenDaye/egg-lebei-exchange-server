'use strict';

const Service = require('egg').Service;

class CmcService extends Service {
  handleResponse(res) {
    const { data, status } = res;
    if (status === 200) return data.data;

    throw new Error(data.status.error_message);
  }

  async cryptoCurrencyListingsLatest({
    start = 1,
    limit = 100,
    convert = 'USD',
    sort = 'date_added',
    sort_dir = 'asc',
  }) {
    const res = await this.ctx.curl(
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
    );
    return this.handleResponse(res);
  }

  async cryptoCurrencyMetadata({
    id,
    slug,
    symbol,
    aux = 'urls,logo,description,tags,platform,date_added,notice',
  }) {
    const res = await this.ctx.curl(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', {
        data: { id, slug, symbol, aux },
        dataAsQueryString: true,
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
        },
      }
    );
    return this.handleResponse(res);
  }

  async keyInfo() {
    const res = await this.ctx.curl(
      'https://pro-api.coinmarketcap.com/v1/key/info', {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
        },
      }
    );
    return this.handleResponse(res);
  }
}

module.exports = CmcService;
