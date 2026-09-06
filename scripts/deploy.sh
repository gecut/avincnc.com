#!/bin/sh

set -eu

requireCommand() {
  command_name="$1"

  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "ERROR: ${command_name} is required." >&2
    exit 1
  fi
}

buildImage() {
  requireCommand docker
  docker build -t "${IMAGE_NAME:-avincnc}:${IMAGE_TAG:-local}" .
}

startStack() {
  requireCommand docker
  docker compose up --detach --build
}

stopStack() {
  requireCommand docker
  docker compose down
}

verifyOrigin() {
  sh "$(dirname "$0")/verify-origin.sh"
}

showUsage() {
  echo "Usage: $0 {build|start|stop|verify}" >&2
}

case "${1:-}" in
  build) buildImage ;;
  start) startStack ;;
  stop) stopStack ;;
  verify) verifyOrigin ;;
  *)
    showUsage
    exit 1
    ;;
esac
