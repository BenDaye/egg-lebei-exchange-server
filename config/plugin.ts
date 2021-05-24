import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  mongoose: {
    enable: false,
    package: 'egg-mongoose',
  },
  passport: {
    enable: false,
    package: 'egg-passport',
  },
  passportLocal: {
    enable: false,
    package: 'egg-passport-local',
  },
};

export default plugin;
