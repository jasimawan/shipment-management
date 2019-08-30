FROM node:12.9.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /shipment-managment/src/app
RUN npm cache clear
RUN npm install
COPY . /usr/src/app
EXPOSE 4200
CMD ["npm", "start"]
