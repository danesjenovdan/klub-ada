FROM node:20-alpine as build

# set current directory
WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# copy source code
COPY public public/
COPY src src/
COPY index.html vite.config.js ./

# set default NODE_ENV to production
# ARG NODE_ENV
# ENV NODE_ENV ${NODE_ENV:-production}

# run the build
RUN npm run build

# ---
# actual image
# ---
FROM nginx:alpine

# copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# enable HTML5 history mode
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
