FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate
# RUN npx prisma migrate dev --name init

COPY . .
CMD ["npm","run","dev"]
