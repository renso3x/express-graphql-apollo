FROM node:latest

COPY . /usr/src/app/graphqlApp

WORKDIR /usr/src/app/graphqlApp

COPY package.json /usr/src/app/graphqlApp/

RUN yarn install

CMD yarn start