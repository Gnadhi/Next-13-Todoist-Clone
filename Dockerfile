FROM node:18-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /target
COPY . .
EXPOSE 3000
