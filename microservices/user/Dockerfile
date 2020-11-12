FROM node:12-alpine
RUN mkdir -p /app
WORKDIR /app
ENV PORT=3000
COPY . .
RUN npm install
EXPOSE $PORT
CMD ["./wait-for-postgres.sh", "172.25.0.2"]
CMD ["node", "server.js" ]
