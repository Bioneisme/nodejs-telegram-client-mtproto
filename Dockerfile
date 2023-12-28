FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/mtproto
WORKDIR /opt/mtproto
COPY package.json package-lock.json .
RUN npm install
COPY . .
CMD [ "npm", "start"]