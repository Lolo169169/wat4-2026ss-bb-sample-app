#!/bin/sh
cp /app/config.e2e.js /app/config.js
sed -i "s|\${API_URL}|$API_URL|g" /app/config.js
exec "$@"