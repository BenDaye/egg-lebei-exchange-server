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

  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
