# change base image
FROM nginx:alpine

# enable HTML5 history mode
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# copy built files from the 'build' container into the nginx container
COPY ./dist/ /usr/share/nginx/html/