# 使用Python 3.9.6作为基础镜像
FROM python:3.9.6

LABEL maintainer="hukdoesn <hukdoesn@163.com>" \
      version="1.0" \
      description="PassGen" \
      build.date="2024-04-07"

# 设置工作目录
WORKDIR /app

# 复制当前目录下的所有文件到工作目录
COPY . .

# 安装Python依赖, 运行安装脚本安装nvm，设置环境变量
RUN pip3 install -r server/requirements.txt && \
    bash install.sh
    # cp sources.list /etc/apt/sources.list && \
    # apt-get update && \

ENV NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/

# 安装Node.js和npm，# 设置npm镜像源，安装前端依赖
WORKDIR /app/web
RUN . ~/.bashrc && \
    nvm install v16.16.0 && \
    npm config set registry https://registry.npmmirror.com && \
    npm install && \
    chmod +x /app/start.sh

# 暴露前端服务的端口，默认Vue.js的开发服务器端口是8080
EXPOSE 8080

# 启动前端开发服务器，这会在容器启动时执行
CMD ["/app/start.sh"]