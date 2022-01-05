FROM hub.i.mytophome.com/docker/nginx:1.12.1-alpine

ARG PROJECT_NAME
ENV PROJECT_NAME ${PROJECT_NAME}

COPY build /app/
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /app/

CMD ["nginx", "-g", "daemon off;"]
