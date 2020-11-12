FROM node:12-alpine
RUN mkdir -p /app
WORKDIR /app
ENV PORT=4000
COPY . .
RUN npm install
RUN npm install -g ts-node
EXPOSE $PORT
CMD [ "yarn", "start:dev" ]
