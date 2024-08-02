FROM node:18.18.0-alpine as node18
WORKDIR /app
RUN npm install -g chii --registry=https://registry.npmmirror.com

COPY run_chii.sh .
RUN  chmod +x run_chii.sh

EXPOSE 80
ENTRYPOINT sh run_chii.sh
