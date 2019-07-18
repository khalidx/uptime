FROM node:10.16

ADD . /app

WORKDIR /app
RUN npm install
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]