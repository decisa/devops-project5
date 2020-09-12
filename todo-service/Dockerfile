FROM node:12

ARG DATABASE=project5db
ARG DB_PASSWORD=password

ENV DB_URI=mysql://root:$DB_PASSWORD@todo-service-db/$DATABASE?charset=UTF8
ENV DB_HOST=todo-service-db

COPY . /opt/app

WORKDIR /opt/app

RUN yarn set version berry
RUN yarn install

CMD "./wait-for-db.sh"
