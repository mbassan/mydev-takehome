FROM node:16-alpine3.11
WORKDIR /app
COPY api/package.json .
RUN npm install
COPY api .
RUN rm /app/.env
COPY db db
ENTRYPOINT npm start