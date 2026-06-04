FROM node:20-alpine AS build
WORKDIR /app

# Workspace manifests as a separate layer — invalidates only on dependency changes
COPY package.json yarn.lock turbo.json tsconfig.base.json ./
COPY packages/ui-kit/package.json ./packages/ui-kit/
COPY packages/storybook/package.json ./packages/storybook/

RUN yarn install --immutable

# ui-kit source needed directly by storybook (stories + @ui-kit alias in main.ts)
COPY packages/ui-kit/src ./packages/ui-kit/src
COPY packages/ui-kit/tsconfig.json packages/ui-kit/tsconfig.build.json packages/ui-kit/vite.config.ts ./packages/ui-kit/

# storybook source
COPY packages/storybook/.storybook ./packages/storybook/.storybook
COPY packages/storybook/stories ./packages/storybook/stories
COPY packages/storybook/storybook ./packages/storybook/storybook
COPY packages/storybook/public ./packages/storybook/public
COPY packages/storybook/locales ./packages/storybook/locales
COPY packages/storybook/tsconfig.json ./packages/storybook/

# turbo runs ui-kit build (^build) then storybook build
RUN yarn build-storybook

FROM nginx:stable-alpine
COPY --from=build /app/packages/storybook/storybook-static /var/www/nginx
COPY packages/storybook/nginx/server.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
