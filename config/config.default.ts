import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618727195323_813';

  // add your egg config in here
  // config.middleware = [ 'authenticated' ];

  config.security = {
    csrf: false,
  };

  config.httpclient = {
    request: {
      dataType: 'json',
      timeout: 30 * 1000,
    },
  };

  config.huobiHost = process.env.HUOBI_HOST || 'api.huobi.pro';
  config.huobiHttpBaseUrl = process.env.HUOBI_HTTP_BASE_URL || 'https://api.huobi.pro';
  config.huobiWsBaseUrl = process.env.HUOBI_WS_BASE_URL || 'wss://api.huobi.pro/ws';

  // config.authenticated = {
  //   ignore: '/auth/login',
  // };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
