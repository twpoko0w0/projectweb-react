FROM node:lts-alpine AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV REACT_APP_API_ENDPOINT=http://localhost:8080
COPY package.json .
RUN npm install --ignore-platform
RUN npm install firebase
COPY . .
RUN npm run build

FROM nginx:1.14.2-alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]