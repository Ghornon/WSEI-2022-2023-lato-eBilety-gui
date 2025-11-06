FROM node:18.6 AS builder

WORKDIR /app

COPY . .

ENV VITE_SERVICE_URL="http://localhost:8080"

RUN npm install

RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY deploy/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
