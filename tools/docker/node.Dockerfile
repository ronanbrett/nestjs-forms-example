### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:alpine as builder

ENV CYPRESS_INSTALL_BINARY 0

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build api --prod

CMD ["node", "dist/apps/api/main.js"]
