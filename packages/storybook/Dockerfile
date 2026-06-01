FROM node:20-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
COPY packages/ui-kit/package.json packages/ui-kit/package.json
COPY packages/storybook/package.json packages/storybook/package.json

RUN yarn install --immutable;

COPY . .

RUN yarn build-storybook

FROM nginx:stable-alpine
COPY --from=build /app/packages/storybook/storybook-static /var/www/nginx
COPY --from=build /app/packages/storybook/nginx/server.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
