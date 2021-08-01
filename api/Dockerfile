FROM node:12.16.1-buster-slim
RUN apt-get update && apt-get install -y git && apt-get install -y telnet
WORKDIR /app
COPY package.json .
RUN npm install
COPY . /app
ENTRYPOINT npm start