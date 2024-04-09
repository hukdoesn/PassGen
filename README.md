# PassGen

[![python](https://img.shields.io/badge/Python-3.9-3776AB.svg?style=flat&logo=python&logoColor=white)](https://www.python.org)
[![django](https://img.shields.io/badge/Django-3.2-0077C6.svg?style=flat&logo=django&logoColor=white)](https://www.djangoproject.com)
[![vue](https://img.shields.io/badge/Vue-3.2.13-0077C6.svg?style=flat&logo=vue&logoColor=white)](https://vuejs.org)
![node](https://img.shields.io/badge/Node.js-16.16.0-0077C6.svg?style=flat&logo=node&logoColor=white)
![linux](https://img.shields.io/badge/Linux-aliyun-0077C6.svg?style=flat&logo=linux&logoColor=white)
[![Docker - lscpu](https://img.shields.io/badge/Docker-lscpu-2496ed?logo=docker&logoColor=white)](https://hub.docker.com/r/lscpu/passgen)
[![blog](https://img.shields.io/badge/Blog-胡图图不涂涂-0077C6.svg?style=flat&logo=blog&logoColor=white)](https://ext4.cn)


PassGen是一个在线生成随机密码的工具，无论在何处，密码只属于你。

**请记住，随机性是密码强度的关键因素，而生成真正随机密码的最好方法是使用密码生成器。**


## Blog

* [胡图图不涂涂](https://ext4.cn)

## 部署
- **Python**: `3.9.6` - 为后端服务提供强大的运行时环境。
- **Django**: `3.2` - 高效的后端框架，用于快速开发安全且可维护的Web应用。
- **Vue**: `3` - 前端框架，提供响应式的数据绑定和组合的视图组件。
- **Node.js**: `v16.16.0` - JavaScript运行环境，支持前端项目的构建过程。

| Command | Description |
| --- | --- |
| `git status` | List all *new or modified* files |
| `git diff` | Show file differences that **haven't been** staged |


### 版本介绍

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

# 启动后端
python3 manage.py runserver 0.0.0.0:8000
```