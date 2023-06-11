# Etapa de criação da imagem
FROM node:16 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install  --omit=dev

COPY . .
RUN npm run build

# Etapa de produção da imagem
FROM nginx:latest

COPY --from=builder /app/dist/sgfly /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
