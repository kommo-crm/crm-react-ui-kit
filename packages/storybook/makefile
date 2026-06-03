DATE:=$(shell date +%Y_%m_%d_%H_%M_%S)

build:
	docker build -t ${REGISTRY_URL}/crm-react-ui-kit:build_${DATE} --platform linux/amd64 .

push:
	docker push ${REGISTRY_URL}/crm-react-ui-kit:build_${DATE}

deploy: build push
