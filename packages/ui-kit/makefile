lint:
	yarn lint

build:
	yarn build

publish-patch:
	yarn lint
	npm version patch
	npm login
	yarn build
	npm publish

publish-minor:
	yarn lint
	npm version minor
	npm login
	yarn build
	npm publish
