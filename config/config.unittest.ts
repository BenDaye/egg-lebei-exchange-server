import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    passportJwt: {
      secret: 'unittest',
    },
  };
  return config;
};
