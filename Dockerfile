FROM node:10.24.0
WORKDIR /app
COPY package.json .
RUN npm install --registry=https://registry.npm.taobao.org
ADD . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]