FROM node:12

COPY . /opt/app

WORKDIR /opt/app

# RUN yarn db:migrate
# RUN yarn db:seed

# CMD yarn watch
CMD "./wait-for-db.sh"
