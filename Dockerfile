# Estágio de build do frontend
FROM node:18 AS build

WORKDIR /app

# Copiar arquivos de dependência e instalar
COPY package.json package-lock.json ./
RUN yarn install

# Copiar o restante dos arquivos e construir o frontend
COPY . .
RUN yarn build

# Instalar apenas as dependências necessárias para o servidor
RUN npm install express

EXPOSE 3000

# Comando para rodar o servidor
CMD ["node", "server.js"]
