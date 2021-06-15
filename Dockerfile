FROM registry.cn-hangzhou.aliyuncs.com/aliyun-node/alinode:4.7.2-alpine

WORKDIR /root/app

RUN mkdir -p /root/app

RUN npm config set unsafe-perm true && npm i -g yarn

COPY ./output/ ./

COPY ./package.json ./

RUN yarn --prod

RUN yarn add tslib --prod

EXPOSE 7001

CMD yarn start
