FROM node:12-buster-slim AS builder

COPY . /app
WORKDIR /app
RUN apt-get update && apt-get install -y python2.7 make build-essential \
    && npm install ----build-from-source --python="python2.7" \
    && rm -rf /var/lib/apt/lists/*

FROM node:12-buster-slim

WORKDIR /app
COPY --from=builder /app .

CMD ["npm", "run", "production"]