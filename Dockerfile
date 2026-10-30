FROM node:14.18.0
WORKDIR /app
COPY package.json .
RUN npm config set registry https://registry.npmjs.org/ && npm install
ADD . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]