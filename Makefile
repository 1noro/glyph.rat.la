all: help

.PHONY: help
help:
	@cat Makefile

.PHONY: local-setup
local-setup:
	@yarn install

.PHONY: local-test
local-test:
	@yarn test

.PHONY: docker-setup
docker-setup:
	docker run --rm -v "$(PWD)":/usr/src/app -w /usr/src/app -u $(shell id -u):$(shell id -g) node:16 yarn install --loglevel verbose

.PHONY: docker-test
docker-test:
	docker run --rm -v "$(PWD)":/usr/src/app -w /usr/src/app -u $(shell id -u):$(shell id -g) node:16 yarn test

.PHONY: docker-run
docker-run:
	docker run --rm --name glyph-server -v "$(PWD)"/public:/usr/share/nginx/html:ro -p 8080:80 nginx
