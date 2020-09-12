FROM node:12

ARG DATABASE=project5db

ENV DB_URI=mysql://root:sqlpass@todo-service-db/$DATABASE?charset=UTF8
ENV DB_HOST=todo-service-db

COPY . /opt/app

WORKDIR /opt/app

RUN yarn set version berry
RUN yarn install

CMD "./wait-for-db.sh"
