FROM node:20.19.1

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 4000

CMD [ "yarn", "start" ]
