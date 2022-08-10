# 拉取node镜像 取个builder的别名
FROM node:10.24.0 as builder 
# 指定工作目录
WORKDIR /app
# 只复制package.json 去安装node_modules
COPY package.json .
RUN npm install
ADD . . 
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx
# 多阶段构建 将叫builder的镜像指定目录复制到当前工作目录
COPY --from=builder /app/dist  /usr/share/nginx/html