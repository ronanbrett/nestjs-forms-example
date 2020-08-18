### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:alpine as builder

COPY dist dist
COPY node_modules/.bin node_modules/.bin
COPY node_modules/tslib node_modules/tslib
COPY node_modules/@nest node_modules/@nest

## Build the angular app in production mode and store the artifacts in dist folder
CMD ["node", "dist/apps/api/main.js"]
