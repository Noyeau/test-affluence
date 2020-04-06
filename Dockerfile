FROM node:12-alpine

COPY src/ ./src
COPY tsconfig.json ./
COPY package.json ./

RUN npm install

CMD npm run start