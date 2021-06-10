import { Controller } from 'egg';
export default class CoinMarketCapController extends Controller {
  public async handleResponse(res) {
    const { data, status } = res;
    if (status === 200) return this.handleSuccess(data.data);

    this.ctx.body = {
      status,
      message: `CMC Error: ${data.status.error_message}`,
    };
    return;
  }

  public async handleSuccess(data) {
    const res = {
      status: 1,
      message: 'success',
      data,
    };
    const key = this.ctx.url.toLowerCase();
    this.app.coinMarketCapCache.set(key, res);
    this.ctx.body = res;
    return;
  }

  public async handleError(err) {
    this.ctx.body = {
      status: 0,
      message: `Error: ${err?.message}`,
    };
    return;
  }

  public async cryptoCurrencyListingsLatest() {
    try {
      const { start = 1,
        limit = 100,
        convert = 'USD',
        sort = 'date_added',
        sort_dir = 'asc' } = this.ctx.query;

      this.handleResponse(await this.ctx.curl('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', { data: {
        start,
        limit,
        convert,
        sort,
        sort_dir,
      }, dataAsQueryString: true, headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
      } }));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async cryptoCurrencyMetadata() {
    try {
      const { id, slug, symbol, aux = 'urls,logo,description,tags,platform,date_added,notice' } = this.ctx.query;
      this.handleResponse(await this.ctx.curl('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', { data: { id, slug, symbol, aux }, dataAsQueryString: true, headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
      } }));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async keyInfo() {
    try {
      this.handleResponse(await this.ctx.curl('https://pro-api.coinmarketcap.com/v1/key/info', { headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
      } }));
    } catch (err) {
      this.handleError(err);
    }
  }
}
