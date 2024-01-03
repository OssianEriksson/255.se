FROM node:20-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install

RUN npm run build


FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY --from=builder /usr/src/app/build build

RUN npm ci --omit=dev --ignore-scripts

EXPOSE 3000
CMD [ "node", "build" ]