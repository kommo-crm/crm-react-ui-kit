#!/bin/bash

rm -f .env.docker
touch .env.docker

PLAYWRIGHT_VERSION="1.47.0"

echo "IMAGE=mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-focal" >> .env.docker;

while [[ $# -gt 0 ]]; do
  case "$1" in
      -u)
        echo "UPDATE_SNAPSHOTS_FLAG=-u" >> .env.docker
        ;;
  esac
  shift
done