# Step 1: Build React app
FROM node:22 AS build
WORKDIR /quizzer-fed-api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]