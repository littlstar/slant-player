
build: components
	component build

components:
	component install

dist: components
	component build -o . -s SlantPlayer -n slant-player

.PHONY: build
