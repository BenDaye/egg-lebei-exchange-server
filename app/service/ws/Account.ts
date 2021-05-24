import { Service } from 'egg';
import WebSocket = require('ws');
import SocksProxyAgent = require('socks-proxy-agent');

type HuobiWsMessageAction = 'sub' | 'req' | 'ping' | 'pong' | 'push';

interface HuobiWsMessage {
  action: HuobiWsMessageAction
  ch?: string
}

interface HuobiWsAuthRequest extends HuobiWsMessage {
  params: any
}

interface HuobiWsResponse extends HuobiWsMessage {
  code: number
  data: any
}

interface HuobiWsPingPongRequest extends HuobiWsMessage {
  data: {
    ts: number
  }
}

export default class Account extends Service {
  public async sign({ accessKey, secretKey }) {
    const params = this.ctx.helper.signWs({ accessKey, secretKey });
    const authRequest: HuobiWsAuthRequest = {
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
      ws.on('message', (msg: string) => {
        const message: HuobiWsResponse = JSON.parse(msg);
        console.log('message ->', message);
        switch (message.action) {
          case 'sub':

            break;
          case 'ping':
            {
              const ping: HuobiWsPingPongRequest = message;
              const pong: HuobiWsPingPongRequest = {
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
