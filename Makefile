ifeq ($(secret_dir),)
  $(error secret_dir is not set)
endif

config:
	docker-compose -f docker-compose.yml -f ./topology/development/secret.yml -f local.yml config

up:
	secret_dir=$(secret_dir) docker-compose -f docker-compose.yml -f ./topology/development/secret.yml -f ./topology/development/localhost.yml -f local.yml up

down:
	secret_dir=$(secret_dir) docker-compose -f docker-compose.yml -f ./topology/development/secret.yml -f local.yml down