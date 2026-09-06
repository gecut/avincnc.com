#!/bin/sh

set -eu

origin_url="${ORIGIN_URL:-http://127.0.0.1:8080}"

request_status() {
  path="$1"
  expected_status="$2"
  actual_status="$(curl --silent --output /dev/null --write-out '%{http_code}' "${origin_url}${path}")"

  if [ "$actual_status" != "$expected_status" ]; then
    echo "ERROR: ${path} returned ${actual_status}; expected ${expected_status}." >&2
    return 1
  fi

  echo "OK: ${path} returned ${actual_status}."
}

require_header() {
  path="$1"
  header_name="$2"

  if ! curl --silent --show-error --head "${origin_url}${path}" | grep -qi "^${header_name}:"; then
    echo "ERROR: ${path} is missing ${header_name}." >&2
    return 1
  fi

  echo "OK: ${path} includes ${header_name}."
}

require_header_value() {
  path="$1"
  header_name="$2"
  expected_value="$3"

  if ! curl --silent --show-error --head "${origin_url}${path}" | grep -qi "^${header_name}:.*${expected_value}"; then
    echo "ERROR: ${path} does not include ${header_name}: ${expected_value}." >&2
    return 1
  fi

  echo "OK: ${path} includes ${header_name}: ${expected_value}."
}

command -v curl >/dev/null 2>&1 || {
  echo "ERROR: curl is required." >&2
  exit 1
}

request_status "/server-info" "200"
request_status "/" "200"
request_status "/missing-asset.js" "404"
require_header "/" "Cache-Control"
require_header "/" "ETag"
require_header_value "/missing-asset.js" "Cache-Control" "no-store"

echo "Origin verification completed successfully."
