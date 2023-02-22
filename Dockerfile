FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
RUN yarn generate
RUN yarn build
EXPOSE 8080
CMD ["yarn", "start"]