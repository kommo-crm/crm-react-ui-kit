.PHONY: patch minor storybook build-storybook push-storybook

patch:
	$(MAKE) -C packages/ui-kit patch

minor:
	$(MAKE) -C packages/ui-kit minor

storybook:
	$(MAKE) -C packages/storybook storybook

build-storybook:
	$(MAKE) -C packages/storybook build-storybook

push-storybook:
	$(MAKE) -C packages/storybook push-storybook
