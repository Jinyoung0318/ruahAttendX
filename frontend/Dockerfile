# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf