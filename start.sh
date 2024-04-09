#!/bin/bash
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # 加载nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# 使用nvm安装的node和npm
nvm use v16.16.0

# 启动 Django 开发服务器
python3 /app/server/manage.py runserver 0.0.0.0:8000 &

# 启动 Vue.js 开发服务器
cd /app/web && npm run pro