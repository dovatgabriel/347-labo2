FROM node:20.0.0-alpine as development

RUN apk add --no-cache bash

WORKDIR /project

COPY package*.json ./

RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json && npm install

COPY . .

CMD ["npm", "run", "start"]

FROM node:20.0.0-alpine as production

WORKDIR /project

COPY --from=development /project /project

COPY . .

CMD ["npm", "run", "start:prod"]
