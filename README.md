<p align="center">
  <img src="web/src/assets/svg/md_logo.svg">

  <a href="https://www.python.org">
    <img src="https://img.shields.io/badge/Python-3.9-3776AB.svg?style=flat&logo=python&logoColor=white" alt="Python" />
  </a>
  <a href="https://www.djangoproject.com">
    <img src="https://img.shields.io/badge/Django-3.2-0077C6.svg?style=flat&logo=django&logoColor=white" />
  </a>
  <a href="https://vuejs.org">
    <img src="https://img.shields.io/badge/Vue-3.2.13-0077C6.svg?style=flat&logo=vue&logoColor=white" />
  </a>
  <a href="https://nodejs.org">
    <img src="https://img.shields.io/badge/Node.js-16.16.0-0077C6.svg?style=flat&logo=node&logoColor=white" />
  </a>
  <a href="https://www.linux.org">
    <img src="https://img.shields.io/badge/Linux-aliyun-0077C6.svg?style=flat&logo=linux&logoColor=white" />
  </a>
  <a href="https://hub.docker.com/r/lscpu/passgen/tags">
    <img src="https://img.shields.io/badge/Docker-lscpu-2496ed?logo=docker&logoColor=white" />
  </a>
  <a href="https://ext4.cn">
    <img src="https://img.shields.io/badge/Blog-胡图图不涂涂-0077C6.svg?style=flat&logo=blog&logoColor=white" />
  </a>
  <a href="https://github.com/hukdoesn/PassGen">
    <img src="https://img.shields.io/github/stars/hukdoesn/PassGen?color=%231890FF&style=flat-square" alt="Stars">
  </a>
</p>
<p align="center">
    请记住，随机性是密码强度的关键因素，而生成真正随机密码的最好方法是使用密码生成器。
</p>



<!-- [![python](https://img.shields.io/badge/Python-3.9-3776AB.svg?style=flat&logo=python&logoColor=white)](https://www.python.org)
[![django](https://img.shields.io/badge/Django-3.2-0077C6.svg?style=flat&logo=django&logoColor=white)](https://www.djangoproject.com)
[![vue](https://img.shields.io/badge/Vue-3.2.13-0077C6.svg?style=flat&logo=vue&logoColor=white)](https://vuejs.org)
![node](https://img.shields.io/badge/Node.js-16.16.0-0077C6.svg?style=flat&logo=node&logoColor=white)
![linux](https://img.shields.io/badge/Linux-aliyun-0077C6.svg?style=flat&logo=linux&logoColor=white)
[![Docker - lscpu](https://img.shields.io/badge/Docker-lscpu-2496ed?logo=docker&logoColor=white)](https://hub.docker.com/r/lscpu/passgen)
[![blog](https://img.shields.io/badge/Blog-胡图图不涂涂-0077C6.svg?style=flat&logo=blog&logoColor=white)](https://ext4.cn) -->


<!-- **请记住，随机性是密码强度的关键因素，而生成真正随机密码的最好方法是使用密码生成器。** -->


## Blog

* [胡图图不涂涂](https://ext4.cn)

## 部署

| 技术      | 版本      |
|:----------|:---------|
| **Python** | `3.9.6`  |
| **Django** | `3.2`    |
| **Vue**    | `3.2.13` |
| **Node**   | `16.16.0`|

### Docker启动

- 使用现有镜像
```bash
# Linux
docker pull lscpu/passgen:v1

docker run -d  --name passgen -p 8080:8080 -p 8000:8000 lscpu/passgen:v1

# Mac
docker pull --platform linux/amd64 lscpu/passgen:v1

docker run -d --platform linux/amd64 --name passgen -p 8080:8080 -p 8000:8000 lscpu/passgen:v1
```

### 本地启动
* 后端Django

```bash
# 进入后端项目
cd server

# 安装依赖
pip3 install -r requirements.txt

# 启动后端
python3 manage.py runserver 0.0.0.0:8000
```
* 前端vue
  *   在进行部署之前，请确保您已经根据您的环境调整了前端的配置文件。
  *   根据您的部署环境，选择编辑 `.env.local`（本地开发环境）或 `.env.production`（生产环境）文件。
  *   修改 `VUE_APP_API_URL` 变量，将其设置为您的域名或IP地址，确保您的前端应用能够正确连接到后端服务。例如：
```bash
# 修改本地开发环境 .env.local
VUE_APP_API_URL='http://localhost:8000'

# 修改生产环境 .env.production
VUE_APP_API_URL='https://yourdomain.com'

# 进入前端项目
cd web

# 更改 npm 镜像
npm config set registry https://registry.npmmirror.com

# 安装依赖
npm install 

# 启动本地环境
npm run dev

# 启动生产环境
npm run pro
```
* 访问：http:// IP:8080 或 http://your域名

![PassGen](/web/src/assets/svg/passgen.jpg)