FROM node:20-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --immutable;

COPY . .

RUN yarn build-storybook

FROM nginx:stable-alpine
COPY --from=build /app/storybook-static /var/www/nginx
COPY --from=build /app/nginx/server.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]