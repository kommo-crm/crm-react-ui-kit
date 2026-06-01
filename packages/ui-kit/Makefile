.PHONY: patch minor

patch:
	yarn lint
	npm version patch
	npm login
	yarn build
	npm publish
	$(MAKE) -C ../storybook storybook

minor:
	yarn lint
	npm version minor
	npm login
	yarn build
	npm publish
	$(MAKE) -C ../storybook storybook
