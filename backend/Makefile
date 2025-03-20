SHELL=bash

ifeq ($(OS),Windows_NT)
	detected_OS := Windows
else
	detected_OS := $(shell uname)
endif

ifeq (detected_OS,Darwin)
	RUN := export NODE_VERSION=$$(cat ../NODE_VERSION) && docker run --rm -u -v $$PWD:/app/ -w /app/ node:$$NODE_VERSION
else
	RUN := export NODE_VERSION=$$(cat ../NODE_VERSION) && docker run --rm -u $$UID:$$GID -v $$PWD:/app/ -w /app/ node:$$NODE_VERSION
endif

.PHONY: dev
dev:
	docker-compose up --build
