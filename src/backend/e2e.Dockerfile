FROM docker.io/node:25.9.0-alpine3.22

ARG API_URL="http://localhost:5000"
ENV API_URL=${API_URL}

WORKDIR /app

HEALTHCHECK --interval=1s --timeout=120s --start-period=10s --retries=110 \
  CMD curl -f http://localhost:5000/counter || exit 1

COPY . .
RUN apk add --no-cache curl && npm install

CMD [ "npm", "run", "start"]

EXPOSE 5000
