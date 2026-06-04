patch:
	$(MAKE) -C packages/ui-kit publish-patch
	$(MAKE) -C packages/storybook deploy

minor:
	$(MAKE) -C packages/ui-kit publish-minor
	$(MAKE) -C packages/storybook deploy

storybook:
	$(MAKE) -C packages/storybook deploy

build-storybook:
	$(MAKE) -C packages/storybook build

push-storybook:
	$(MAKE) -C packages/storybook push
