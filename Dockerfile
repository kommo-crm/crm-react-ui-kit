FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN apk add --update python3 make g++;
RUN yarn install --immutable;
RUN yarn build-storybook

FROM nginx:stable-alpine
COPY --from=build /app/storybook-static /var/www/nginx
COPY --from=build /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/nginx/server.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]