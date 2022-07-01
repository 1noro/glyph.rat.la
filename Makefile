local/setup:
	@npm install

local/test:
	@npm test

docker/setup:
	docker run --rm -v "$(PWD)":/usr/src/app -w /usr/src/app -u $(shell id -u):$(shell id -g) node:17 npm install

docker/test:
	docker run --rm -v "$(PWD)":/usr/src/app -w /usr/src/app -u $(shell id -u):$(shell id -g) node:17 npm test
