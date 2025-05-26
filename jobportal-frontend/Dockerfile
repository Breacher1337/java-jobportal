FROM ubuntu:latest
LABEL authors="elaij"


FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

#RUN npm run build
#use if production phase

EXPOSE 3000
CMD ["npm", "start"]