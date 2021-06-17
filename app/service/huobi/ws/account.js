'use strict';

const Service = require('egg').Service;
const WebSocket = require('ws');
const SocksProxyAgent = require('socks-proxy-agent');

class AccountService extends Service {
  async sign({ accessKey, secretKey }) {
    const params = this.ctx.helper.signWs({ accessKey, secretKey });
    const authRequest = {
      action: 'req',
      ch: 'auth',
      params,
    };

    return await new Promise(resolve => {
      const agent = SocksProxyAgent('socks://127.0.0.1:7890');

      const ws = new WebSocket('wss://api.huobi.pro/ws/v2', { agent });

      ws.on('open', message => {
        console.log('open ->', message);
        console.log('message <-', authRequest);
        ws.send(JSON.stringify(authRequest));
      });
      ws.on('message', msg => {
        const message = JSON.parse(msg);
        console.log('message ->', message);
        switch (message.action) {
          case 'sub':

            break;
          case 'ping':
            {
              const ping = message;
              const pong = {
                action: 'pong',
                data: ping.data,
              };
              console.log('message <-', pong);
              ws.send(JSON.stringify(pong));
            }
            break;
          case 'req':
            resolve(message);
            break;
          default:
            break;
        }
      });
      ws.on('close', message => {
        console.log('close ->', message);
      });

      setTimeout(() => {
        ws.close();
      }, 60 * 1000);
    });
  }
}

module.exports = AccountService;
