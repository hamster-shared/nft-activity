FROM node:16
WORKDIR /app
ADD . /app
RUN yarn install && yarn build

FROM nginx:1.20
ADD script/default.conf /etc/nginx/conf.d
COPY --from=0 /app/dist /usr/share/nginx/html
