DATE:=$(shell date +%Y_%m_%d_%H_%M_%S)

minor:
	yarn lint
	npm version minor
	npm login
	yarn build
	npm publish
	make all

all: build push

build:
	docker build -t ${REGISTRY_URL}/crm-react-ui-kit:build_${DATE} --platform linux/amd64 .

push:
	docker push ${REGISTRY_URL}/crm-react-ui-kit:build_${DATE}
