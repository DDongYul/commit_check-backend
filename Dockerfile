FROM node:18-alpine

COPY . .

RUN npm install

CMD ["ts-node", "src/server.ts"]