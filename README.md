# Breadboard Setup Guide

## Prerequisites

### On local machine (MacOS)
1. Install Docker
1. Install mkcert https://github.com/FiloSottile/mkcert
1. Install helm https://itunes.apple.com/us/app/helm/id1099472017

### Container Registry
1. Create a Container Registry
  1. https://cloud.google.com/container-registry/
  1. https://azure.microsoft.com/en-us/services/container-registry/

### Docker Swarm
1. Create a Docker Swarm
1. Secure the Swarm, options:
  1. Private network
  1. Mutual TLS `__global.swarm_client_cert`, `__global.swarm_host_cert`. You can run `make __global.swarm_client_cert.test` to verify TLS cert.

## Setup

### Generate new secrets
In the ./secret folder, run
```
make all target=breadboard.xyz
```

### Fill in missing secrets
A few secrets cannot be generated, they need to be entered by you. Find all items in the make file that print out 'not configured' or look for empty files under the ./secret folder.

### Helm configuration
Insert the following config in the `Helm Editor` found under the `Helm` task icon, select `Show Editor Window`.

```
127.0.0.1 localhost

127.0.0.1 breadboard.io
127.0.0.1 www.breadboard.io
127.0.0.1 account.breadboard.io
127.0.0.1 github.run
127.0.0.1 gitlab.run
127.0.0.1 bitbucket.run
127.0.0.1 foobar.run
```

## Boot

To run Breadboard on the local machine, go to the root folder of this repo and run
```
make up
```