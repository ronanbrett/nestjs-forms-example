FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY tools/nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY ./dist/apps/forms /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
