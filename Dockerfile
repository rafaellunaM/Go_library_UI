FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:18

WORKDIR /app

COPY --from=build /app/build /app/build
COPY server.js /app/
COPY package.json /app/

RUN npm install express

EXPOSE 3000

CMD ["node", "server.js"]
