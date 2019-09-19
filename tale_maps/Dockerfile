# build stage
FROM arm32v7/node:lts-alpine as build-stage

RUN apk add --update python g++ make && rm -rf /var/cache/apk/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM arm32v7/nginx:stable as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
