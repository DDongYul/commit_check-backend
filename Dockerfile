FROM node:18-alpine

COPY package*.json ./

COPY . .

RUN npm install

CMD ["ts-node", "src/server.ts"]