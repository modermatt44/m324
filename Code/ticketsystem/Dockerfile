FROM node:18

WORKDIR /usr/src/app

COPY ./Code/ticketsystem/package*.json ./

RUN npm install

COPY ./Code/ticketsystem/ .

EXPOSE 3000

CMD ["npm", "start"]
