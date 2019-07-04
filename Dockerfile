FROM node:9.4.0-alpine as build

RUN mkdir -p /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm install

FROM node:9.4.0-alpine as build1

COPY --from=build /app /app

COPY . /app

EXPOSE 3000

WORKDIR /app

# RUN npm i -g npm

# RUN npm audit

ENTRYPOINT [ "npm", "start" ]
