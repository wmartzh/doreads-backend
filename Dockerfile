FROM node:16.17

WORKDIR /app

COPY ./package.json .

RUN npm cache clean --force
RUN npm install
RUN npm run build
COPY . .


CMD [ "node",'./dist/index.js' ]

EXPOSE 8080