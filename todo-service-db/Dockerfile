FROM mysql:8.0.21

ARG DATABASE=project5db
ARG PASSWORD=password

ENV MYSQL_ROOT_PASSWORD=$PASSWORD
ENV MYSQL_DATABASE=$DATABASE

ENV DB_URI=mysql://root:sqlpass@todo-service-db/$DATABASE?charset=UTF8
ENV DB_HOST=todo-service-db