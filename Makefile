all: help

.PHONY: help
help:
	@cat Makefile

.PHONY: local-setup
local-setup:
	@npm install

.PHONY: local-test
local-test:
	@npm test

.PHONY: docker-setup
docker-setup:
	docker run --rm -v "$(PWD)":/usr/src/app -w /usr/src/app -u $(shell id -u):$(shell id -g) node:17 npm install --loglevel verbose

.PHONY: docker-test
docker-test:
	docker run --rm -v "$(PWD)":/usr/src/app -w /usr/src/app -u $(shell id -u):$(shell id -g) node:17 npm test
