DATE:=$(shell date +%Y_%m_%d_%H_%M_%S)

patch:
	yarn lint
	npm version patch
	npm login
	yarn build
	npm publish
	make storybook

minor:
	yarn lint
	npm version minor
	npm login
	yarn build
	npm publish
	make storybook

storybook: build-storybook storybook-push

build-storybook:
	docker build -t ${REGISTRY_URL}/crm-react-ui-kit:build_${DATE} --platform linux/amd64 .

push-storybook:
	docker push ${REGISTRY_URL}/crm-react-ui-kit:build_${DATE}
