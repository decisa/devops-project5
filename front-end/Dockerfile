FROM nginx

COPY ./build /usr/share/nginx/html

COPY ./nginx/config /etc/nginx

WORKDIR /usr/share/nginx/html

# RUN yarn db:migrate
# RUN yarn db:seed

# CMD yarn watch
# CMD yarn startup
