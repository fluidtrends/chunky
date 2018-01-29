#!/usr/bin/env bash

THIS_DIR=$(dirname "$0")
node "$THIS_DIR/../../react-native/local-cli/cli.js" start "$@"
