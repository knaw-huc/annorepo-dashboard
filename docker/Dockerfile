FROM node:lts-alpine AS build

ARG VITE_AR_HOST
ENV VITE_AR_HOST=$VITE_AR_HOST

WORKDIR /src

COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine-slim
COPY --from=build /src/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
