publish\:storybook: build\:storybook push\:storybook

build\:storybook:
	$(MAKE) -C packages/ui-kit build

push\:storybook:
	$(MAKE) -C packages/ui-kit push
