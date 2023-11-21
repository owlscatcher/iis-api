FROM node:18.18-alpine

WORKDIR /app

RUN apk add build-base python3
RUN npm install -g node-gyp

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]

