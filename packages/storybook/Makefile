DATE:=$(shell date +%Y_%m_%d_%H_%M_%S)

.PHONY: storybook build-storybook push-storybook

storybook: build-storybook push-storybook

build-storybook:
	docker build -t ${REGISTRY_URL}/crm-react-ui-kit:build_${DATE} --platform linux/amd64 -f Dockerfile ../..

push-storybook:
	docker push ${REGISTRY_URL}/crm-react-ui-kit:build_${DATE}
