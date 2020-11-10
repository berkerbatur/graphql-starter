FROM node:12-alpine
RUN mkdir -p /app
WORKDIR /app
ENV PORT=3000
COPY . .
RUN npm install
EXPOSE $PORT
CMD [ "node", "server.js" ]
