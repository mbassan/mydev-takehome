FROM node:16-alpine3.11
WORKDIR /app
COPY crawler/package.json .
RUN npm install
COPY crawler .
RUN rm /app/.env
COPY db db
ENTRYPOINT npm start