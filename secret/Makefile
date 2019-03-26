ifeq ($(target),)
  $(error target is not set)
endif

mkcert := $(shell which mkcert)

ifeq ($(mkcert),)
  $(error mkcert is not installed - https://github.com/FiloSottile/mkcert)
endif

target_dir := "${PWD}/${target}"

mongodb_hostname := "mongodb.breadboard.xyz"
mongodb_username := ""
mongodb_password := ""

__global.key:
	mkdir -p "${target_dir}/__global/key"
	openssl genrsa -out "${target_dir}/__global/key/key" 4096
	openssl rsa -in "${target_dir}/__global/key/key" -outform PEM -pubout -out "${target_dir}/__global/key/key.pem"
	ssh-keygen -f "${target_dir}/__global/key/key.pem" -i -mPKCS8 > "${target_dir}/__global/key/key.pub"

__global.registry:
	mkdir -p "${target_dir}/__global/registry"
	touch "${target_dir}/__global/registry/password"
	touch "${target_dir}/__global/registry/prefix"
	touch "${target_dir}/__global/registry/serveraddress"
	touch "${target_dir}/__global/registry/username"
	(>&2 echo "__global.registry not configured")

__global.session.cookie:
	mkdir -p "${target_dir}/__global/session/cookie"
	echo .${target} > "${target_dir}/__global/session/cookie/domain"

__global.session.key:
	mkdir -p "${target_dir}/__global/session"
	openssl rand -base64 32 > "${target_dir}/__global/session/key"

__global.session: __global.session.cookie __global.session.key

__global.swarm_client_cert:
	mkdir -p "${target_dir}/__global/swarm_client_cert"
	if [ ! -f "${target_dir}/__global/swarm_client_cert/ca.pem" ]; then touch "${target_dir}/__global/swarm_client_cert/ca.pem"; fi
	if [ ! -f "${target_dir}/__global/swarm_client_cert/cert.pem" ]; then touch "${target_dir}/__global/swarm_client_cert/cert.pem"; fi
	if [ ! -f "${target_dir}/__global/swarm_client_cert/key.pem" ]; then touch "${target_dir}/__global/swarm_client_cert/key.pem"; fi
	if [ ! -f "${target_dir}/__global/swarm_client_cert/passphrase" ]; then touch "${target_dir}/__global/swarm_client_cert/passphrase"; fi
	if [ ! -f "${target_dir}/__global/swarm_client_cert/hostname" ]; then touch "${target_dir}/__global/swarm_client_cert/hostname"; fi
	if [ ! -f "${target_dir}/__global/swarm_client_cert/port" ]; then echo 2376 > "${target_dir}/__global/swarm_client_cert/port"; fi
	(>&2 echo "__global.swarm_client_cert not configured")

__global.swarm_client_cert.test:
	$(eval host := $(shell cat "${target_dir}/__global/swarm_client_cert/hostname"))
	$(eval dir := ./${target}/__global/swarm_client_cert)
	docker --tlsverify --tlscacert=${dir}/ca.pem --tlscert=${dir}/cert.pem --tlskey=${dir}/key.pem -H=${host}:2376 version

__global.swarm_host_cert:
	(>&2 echo "__global.swarm_host_cert not implemented")

__global: __global.key __global.registry __global.session __global.swarm_client_cert __global.swarm_host_cert

account.backend:
	mkdir -p "${target_dir}/account/backend/mongodb"
	echo "${mongodb_hostname}" > "${target_dir}/account/backend/mongodb/host"
	echo "${mongodb_password}" > "${target_dir}/account/backend/mongodb/password"
	echo "${mongodb_username}" > "${target_dir}/account/backend/mongodb/user"

account.key:
	mkdir -p "${target_dir}/account"
	ln -s ../__global/key "${target_dir}/account/key"

account.mongodb:
	mkdir -p "${target_dir}/account/mongodb"
	echo "account" > "${target_dir}/account/mongodb/database"
	echo "${mongodb_hostname}" > "${target_dir}/account/mongodb/hostname"
	echo "${mongodb_password}" > "${target_dir}/account/mongodb/password"
	echo "${mongodb_username}" > "${target_dir}/account/mongodb/username"

account.oauth:
	mkdir -p "${target_dir}/account/oauth/strategy/github.com"
	if [ ! -f "${target_dir}/account/oauth/strategy/github.com/id" ]; then echo GITHUB_ID > "${target_dir}/account/oauth/strategy/github.com/id"; fi
	if [ ! -f "${target_dir}/account/oauth/strategy/github.com/secret" ]; then echo GITHUB_SECRET > "${target_dir}/account/oauth/strategy/github.com/secret"; fi

account: account.backend account.key account.mongodb account.oauth

breadboard.session:
	mkdir -p "${target_dir}/breadboard"
	ln -s ../__global/session "${target_dir}/breadboard/session"

breadboard: breadboard.session

codedb.git.hosts.github.com.hook:
	mkdir -p "${target_dir}/codedb/git/hosts/github.com/hook"
	openssl rand -base64 32 > "${target_dir}/codedb/git/hosts/github.com/hook/secret"

codedb.git-crypt:
	mkdir -p "${target_dir}/codedb/git-crypt"
	if [ ! -f "${target_dir}/codedb/git-crypt/key" ]; then touch "${target_dir}/codedb/git-crypt/key"; fi
	if [ ! -f "${target_dir}/codedb/git-crypt/passphrase" ]; then touch "${target_dir}/codedb/git-crypt/passphrase"; fi
	(>&2 echo "codedb.git-crypt not configured")

codedb.registry:
	mkdir -p "${target_dir}/codedb"
	ln -s ../__global/registry "${target_dir}/codedb/registry"

codedb: codedb.git.hosts.github.com.hook codedb.git-crypt codedb.registry

gateway.hub:
	mkdir -p "${target_dir}/gateway/hub"
	if [ ! -f "${target_dir}/gateway/hub/aud" ]; then echo make > "${target_dir}/gateway/hub/aud"; fi
	if [ ! -f "${target_dir}/gateway/hub/exp" ]; then echo 2592000 > "${target_dir}/gateway/hub/exp"; fi
	if [ ! -f "${target_dir}/gateway/hub/iss" ]; then echo ${target} > "${target_dir}/gateway/hub/iss"; fi
	if [ ! -f "${target_dir}/gateway/hub/sub" ]; then echo orchestrator@${target} > "${target_dir}/gateway/hub/sub"; fi

gateway.hub.key.pem:
	ln -s ../../__global/key/key.pem "${target_dir}/gateway/hub/key.pem"

gateway.universal-analytics:
	mkdir -p "${target_dir}/gateway/universal-analytics"
	touch "${target_dir}/gateway/universal-analytics/id"
	(>&2 echo "gateway.universal-analytics not configured")

gateway: gateway.hub gateway.hub.key.pem gateway.universal-analytics

haproxy.ssl:
	mkdir -p "${target_dir}/haproxy/ssl"
	mkcert \
		-cert-file "${target_dir}/haproxy/ssl/cert.pem" \
		-key-file "${target_dir}/haproxy/ssl/key.pem" \
		breadboard.io "*.breadboard.io" github.run gitlab.run bitbucket.run foobar.run tailf.io "*.tailf.io" localhost 127.0.0.1 ::1
	cat "${target_dir}/haproxy/ssl/cert.pem" "${target_dir}/haproxy/ssl/key.pem" \
           | tee "${target_dir}/haproxy/ssl/fullchain.pem"


haproxy.ssl_admin:
	mkdir -p "${target_dir}/haproxy/ssl_admin"
	openssl genrsa -out "${target_dir}/haproxy/ssl_admin/ca.key" 4096
	openssl req -new -x509 -days 1826 -key "${target_dir}/haproxy/ssl_admin/ca.key" -out "${target_dir}/haproxy/ssl_admin/ca.crt" -subj "/C=US/ST=Washington/L=Seattle/O=Breadboard/OU=Eng/CN=breadboard.xyz"
	cat "${target_dir}/haproxy/ssl_admin/ca.crt" "${target_dir}/haproxy/ssl_admin/ca.key" > "${target_dir}/haproxy/ssl_admin/server.pem"

haproxy.ssl_admin_client:
	mkdir -p "${target_dir}/haproxy/ssl_admin_client"
	openssl genrsa -out "${target_dir}/haproxy/ssl_admin_client/admin.key" 1024
	openssl req -new -key "${target_dir}/haproxy/ssl_admin_client/admin.key" -out "${target_dir}/haproxy/ssl_admin_client/admin.csr" -subj "/C=US/ST=Washington/L=Seattle/O=Breadboard/OU=Eng/CN=breadboard.xyz"
	echo "[ breadboard_ca ]" > "${target_dir}/haproxy/ssl_admin_client/ca.conf"
	echo "database= ${target_dir}/haproxy/ssl_admin_client/index.txt" >> "${target_dir}/haproxy/ssl_admin_client/ca.conf"
	echo "serial= ${target_dir}/haproxy/ssl_admin_client/serial" >> "${target_dir}/haproxy/ssl_admin_client/ca.conf"
	echo "policy= dft_policy" >> "${target_dir}/haproxy/ssl_admin_client/ca.conf"
	echo "[ dft_policy ]" >> "${target_dir}/haproxy/ssl_admin_client/ca.conf"
	echo "CN= supplied" >> "${target_dir}/haproxy/ssl_admin_client/ca.conf"
	touch "${target_dir}/haproxy/ssl_admin_client/index.txt"
	echo 01 > "${target_dir}/haproxy/ssl_admin_client/serial"
	openssl ca \
		-batch \
	  -notext \
		-config "${target_dir}/haproxy/ssl_admin_client/ca.conf" \
		-name "breadboard_ca" \
		-cert "${target_dir}/haproxy/ssl_admin/ca.crt" \
		-keyfile "${target_dir}/haproxy/ssl_admin/ca.key" \
		-outdir "${target_dir}/haproxy/ssl_admin_client" \
		-md "sha1" \
		-days 365 \
		-passin "pass:123" \
		-in "${target_dir}/haproxy/ssl_admin_client/admin.csr" -out "${target_dir}/haproxy/ssl_admin_client/admin.crt"

haproxy..env:
	mkdir -p "${target_dir}/haproxy"
	echo "HAPROXY_STATS_USER=admin" > "${target_dir}/haproxy/.env"
	echo "HAPROXY_STATS_PASSWORD=$(shell openssl rand -base64 16)" >> "${target_dir}/haproxy/.env"

haproxy.letsencrypt:
	cat ./data/letsencrypt/live/haproxy/fullchain.pem ./data/letsencrypt/live/haproxy/privkey.pem > "./secret/${target}/haproxy/ssl/fullchain.pem"

haproxy: haproxy.ssl haproxy.ssl_admin haproxy.ssl_admin_client haproxy..env

landing.google:
	mkdir -p "${target_dir}/landing/google/analytics"
	touch "${target_dir}/landing/google/analytics/id"
	(>&2 echo "landing.google not configured")

landing.mongodb:
	mkdir -p "${target_dir}/landing/mongodb"
	echo "breadboard" > "${target_dir}/landing/mongodb/database"
	echo "${mongodb_hostname}" > "${target_dir}/landing/mongodb/host"
	echo "${mongodb_password}" > "${target_dir}/landing/mongodb/password"
	echo "${mongodb_username}" > "${target_dir}/landing/mongodb/username"

landing.session:
	mkdir -p "${target_dir}/landing"
	ln -s ../__global/session "${target_dir}/landing/session"

landing: landing.google landing.mongodb landing.session

jwtgen_image := gcr.io/breadboard-xyz/jwtgen:8c85eea2f9f6664b26643e2924338aff5e279e8b

orchestrator.loadbalancer:
	mkdir -p "${target_dir}/orchestrator/loadbalancer"
	touch "${target_dir}/orchestrator/loadbalancer/hostname"
	(>&2 echo "orchestrator.loadbalancer not configured")

orchestrator.registry:
	mkdir -p "${target_dir}/orchestrator"
	ln -s ../__global/registry "${target_dir}/orchestrator/registry"

orchestrator.swarm:
	mkdir -p "${target_dir}/orchestrator"
	ln -s ../__global/swarm_client_cert "${target_dir}/orchestrator/swarm"

orchestrator.token:
	$(eval exp := $(shell cat "${target_dir}/gateway/hub/exp"))
	$(eval aud := $(shell cat "${target_dir}/gateway/hub/aud"))
	$(eval iss := $(shell cat "${target_dir}/gateway/hub/iss"))
	$(eval sub := $(shell cat "${target_dir}/gateway/hub/sub"))
	mkdir -p "${target_dir}/orchestrator/token"
	docker run -v "${target_dir}/__global/key:/certs:ro" ${jwtgen_image} jwtgen -a "RS256" -e "$(exp)" -p /certs/key -c "aud=$(aud)" -c "iss=$(iss)" -c "sub=$(sub)" | tr -d ' \t\n\r\f' > ./${target}/orchestrator/token/jwt

orchestrator: orchestrator.loadbalancer orchestrator.registry orchestrator.swarm orchestrator.token

swarm:
	ln -s ./__global/swarm_host_cert "${target_dir}/swarm"

tailf.key:
	mkdir -p "${target_dir}/tailf/key"
	openssl genrsa -out "${target_dir}/tailf/key/key" 4096
	openssl rsa -in "${target_dir}/tailf/key/key" -outform PEM -pubout -out "${target_dir}/tailf/key/key.pem"
	ssh-keygen -f "${target_dir}/tailf/key/key.pem" -i -mPKCS8 > "${target_dir}/tailf/key/key.pub"

tailf: tailf.key

all: __global account breadboard codedb gateway haproxy landing orchestrator swarm tailf
