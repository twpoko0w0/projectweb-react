FROM node:lts-alpine AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV REACT_APP_API_ENDPOINT=https://api.experiencehub-161090-final.win
ENV REACT_APP_EMAIL_CONFIRM_URL=https://experiencehub-161090-final.win
COPY package.json .
RUN npm install --ignore-platform
COPY . .
RUN npm run build

FROM nginx:1.14.2-alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx
COPY ssl/ /etc/nginx/
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
