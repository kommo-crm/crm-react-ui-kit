FROM node:20-alpine AS build
WORKDIR /monorepo

COPY package.json yarn.lock ./
COPY packages/ui-kit/package.json ./packages/ui-kit/
COPY packages/storybook/package.json ./packages/storybook/
COPY packages/crm-tokens/package.json ./packages/crm-tokens/

RUN yarn install --immutable --ignore-engines

COPY packages/ ./packages/

RUN yarn workspace @kommo-crm/storybook build-storybook

FROM nginx:stable-alpine
COPY --from=build /monorepo/packages/storybook/storybook-static /var/www/nginx
COPY --from=build /monorepo/packages/storybook/nginx/server.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
