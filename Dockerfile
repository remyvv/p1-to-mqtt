FROM node:12-buster-slim

COPY . /app
WORKDIR /app
RUN npm install

CMD ["npm", "run", "production"]