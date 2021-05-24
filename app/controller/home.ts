import { Controller } from 'egg';
import ccxt = require('ccxt');
import HttpsProxyAgent = require('https-proxy-agent');

const agent = HttpsProxyAgent('http://127.0.0.1:7890');

export default class HomeController extends Controller {
  static HuobiApi = new ccxt.huobipro({ agent });

  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async ccxt() {
    const { ctx } = this;

    ctx.body = await HomeController.HuobiApi.loadMarkets();
  }
}
