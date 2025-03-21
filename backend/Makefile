SHELL=bash

ifeq ($(OS),Windows_NT)
	detected_OS := Windows
else
	detected_OS := $(shell uname)
endif

ifeq (detected_OS,Darwin)
	RUN := export NODE_VERSION=$$(cat ../NODE_VERSION) && docker run --rm -u -v $$PWD/../frontend/counter-app:/app/ -w /app/ node:$$NODE_VERSION
else
	RUN := export NODE_VERSION=$$(cat ../NODE_VERSION) && docker run --rm -u $$UID:$$GID -v $$PWD/../frontend/counter-app:/app/ -w /app/ node:$$NODE_VERSION
endif

.PHONY: install
install:
	$(RUN) npm install

.PHONY: dev
dev:
	docker-compose up --build

.PHONY: test
test:
	docker-compose run --rm --build django-api python manage.py test
