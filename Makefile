ifeq ($(secret_dir),)
  $(error secret_dir is not set)
endif

config:
	docker-compose -f docker-compose.yml -f ./topology/development/secret.yml -f local.yml config

up.breadboard.io:
	docker stack deploy --with-registry-auth --compose-file=./docker-compose.yml --compose-file=./topology/production/constraints.yml --compose-file=./topology/development/secret.yml --compose-file=./topology/production/letsencrypt.yml breadboard-io

up:
	secret_dir=$(secret_dir) docker-compose -f docker-compose.yml -f ./topology/development/secret.yml -f ./topology/development/localhost.yml -f local.yml up

down.breadboard.io:
	docker stack rm breadboard-io || true
	sleep 10
	docker container prune -f
	sleep 10
	docker system prune -f

down:
	secret_dir=$(secret_dir) docker-compose -f docker-compose.yml -f ./topology/development/secret.yml -f local.yml down

	# docker run --rm \
	#      --network=kong-net \
	#      -e "KONG_DATABASE=cassandra" \
	#      -e "KONG_PG_HOST=kong-database" \
	#      -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
	#      kong:latest kong migrations up
	#
	#
	# docker run -d --name kong \
	#     --network=kong-net \
	#     -e "KONG_DATABASE=cassandra" \
	#     -e "KONG_PG_HOST=kong-database" \
	#     -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
	#     -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
	#     -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
	#     -e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
	#     -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
	#     -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" \
	#     -p 8000:8000 \
	#     -p 8443:8443 \
	#     -p 8001:8001 \
	#     -p 8444:8444 \
	#     kong:latest


# disk usage
# sudo du -h --max-depth=7 /* | sort -n
# syslog on nodes was 58gb