#!/usr/bin/env bash

set -x
set -e

getVersionCommand() {
  case $1 in
    patch|major|minor|prepatch|premajor|preminor) echo $1 ;;
    *) echo "Invalid npm version command '${$1}'" && exit 1 ;;
  esac
}

deploy() {
  local cmd=$(getVersionCommand $1)
  rm -rf ./dist
  tsc
  cp ./package.json ./dist
  cp ./README.md ./dist;
  cd ./dist
  npm publish
}

deploy
