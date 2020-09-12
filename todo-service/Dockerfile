FROM node:12

COPY . /opt/app

WORKDIR /opt/app

RUN yarn set version berry
RUN yarn install

CMD "./wait-for-db.sh"
