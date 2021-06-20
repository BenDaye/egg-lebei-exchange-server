'use strict';

const assert = require('assert');
const cacheManager = require('cache-manager');
const mongoose = require('mongoose');
const mongooseStore = require('./engines/mongoose');
const mask = require('./utils/mask');

module.exports = (config, app) => {
  const { host, port, auth, db, options, ttl } = config;

  // assert(
  //   host && port && auth && db, "[egg-cache-manager] [mongoose] ERROR 'host && port && auth && db' are required"
  // );

  const { modelName, modelOptions } = options;

  assert(
    modelName && modelOptions && modelOptions.collection, "[egg-cache-manager] [mongoose] ERROR 'modelName && modelOptions' are required"
  );

  const _modelOptions = {
    versionKey: false,
    read: 'secondaryPreferred',
    collection: modelOptions.collection,
  };

  const url = `mongodb://${auth}@${host}${port ? `:${port}` : ''}${db ? `/${db}` : ''}`;

  app.coreLogger.info(
    `[egg-cache-manager] [mongoose] CONNECTING [${
      modelOptions.collection
    }] [${modelName}] ==> ${mask(url)}`
  );

  const client = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  client.on('error', err => {
    err.message = `[egg-cache-manager] [mongoose] ERROR [${modelOptions.collection}] [${modelName}] ==> ${err.message}`;
    app.coreLogger.error(err);
  });

  client.on('disconnected', () => {
    app.coreLogger.warn(
      `[egg-cache-manager] [mongoose] DISCONNECTED [${
        modelOptions.collection
      }] [${modelName}] ==> ${mask(url)}`
    );
  });

  client.on('connected', () => {
    app.coreLogger.info(
      `[egg-cache-manager] [mongoose] CONNECTED [${
        modelOptions.collection
      }] [${modelName}] ==> ${mask(url)}`
    );
  });

  client.on('reconnected', () => {
    app.coreLogger.info(
      `[egg-cache-manager] [mongoose] RECONNECTED [${
        modelOptions.collection
      }] [${modelName}] ==> ${mask(url)}`
    );
  });

  return cacheManager.caching({
    store: mongooseStore,
    mongoose,
    ttl,
    modelName,
    modelOptions: _modelOptions,
    connection: client,
  });
};
