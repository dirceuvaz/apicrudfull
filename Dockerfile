# Usa a imagem base do Node.js
FROM node:20

# Cria um diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY backend/package*.json ./

# Instala as dependências da aplicação
RUN npm install 

# Copia todos os arquivos da aplicação para o diretório de trabalho
COPY backend ./

EXPOSE 8800

# Define o comando para iniciar a aplicação
CMD ["node", "index.js"]