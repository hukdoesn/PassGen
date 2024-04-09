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

Docker启动

- 使用现有镜像
```bash
docker pull lscpu/passgen:v1
```

- 进入飞书[开发者后台](https://open.feishu.cn/app)
- 创建企业自建应用，信息随意填写
- 选择测试企业和人员，创建测试企业，绑定应用，切换至测试版本
- （重要）打开权限管理，云文档，开通所有只读权限
  - 「查看、评论和导出文档」权限 `docs:doc:readonly`
  - 「查看 DocX 文档」权限 `docx:document:readonly`
  - 「查看、评论和下载云空间中所有文件」权限 `drive:drive:readonly`
  - 「查看和下载云空间中的文件」权限 `drive:file:readonly`
- 打开凭证与基础信息，获取 App ID 和 App Secret

## 如何使用

注意：飞书旧版文档的下载工具已决定不再维护，但分支 [v1_support](https://github.com/Wsine/feishu2md/tree/v1_support) 仍可使用，对应的归档为 [v1.4.0](https://github.com/Wsine/feishu2md/releases/tag/v1.4.0)，请知悉。

<details>
  <summary>命令行版本</summary>

  借助 Go 语言跨平台的特性，已编译好了主要平台的可执行文件，可以在 [Release](https://github.com/Wsine/feishu2md/releases) 中下载，并将相应平台的 feishu2md 可执行文件放置在 PATH 路径中即可。

   **查阅帮助文档**

   ```bash
   $ feishu2md -h
   NAME:
     feishu2md - Download feishu/larksuite document to markdown file

   USAGE:
     feishu2md [global options] command [command options] [arguments...]

   VERSION:
     v2-0e25fa5

   COMMANDS:
     config        Read config file or set field(s) if provided
     download, dl  Download feishu/larksuite document to markdown file
     help, h       Shows a list of commands or help for one command

   GLOBAL OPTIONS:
     --help, -h     show help (default: false)
     --version, -v  print the version (default: false)

   $ feishu2md config -h
   NAME:
      feishu2md config - Read config file or set field(s) if provided

   USAGE:
      feishu2md config [command options] [arguments...]

   OPTIONS:
      --appId value      Set app id for the OPEN API
      --appSecret value  Set app secret for the OPEN API
      --help, -h         show help (default: false)
   ```

   **生成配置文件**

   通过 `feishu2md config --appId <your_id> --appSecret <your_secret>` 命令即可生成该工具的配置文件。

   通过 `feishu2md config` 命令可以查看配置文件路径以及是否成功配置。

   更多的配置选项请手动打开配置文件更改。

   **下载为 Markdown**

   通过 `feishu2md dl <your feishu docx url>` 直接下载，文档链接可以通过 **分享 > 开启链接分享 > 复制链接** 获得。

   示例：

   ```bash
   $ feishu2md dl "https://domain.feishu.cn/docx/docxtoken"
   ```
</details>

<details>
  <summary>Docker版本</summary>

  Docker 镜像：https://hub.docker.com/r/wwwsine/feishu2md

   Docker 命令：`docker run -it --rm -p 8080:8080 -e FEISHU_APP_ID=<your id> -e FEISHU_APP_SECRET=<your secret> -e GIN_MODE=release wwwsine/feishu2md`

   Docker Compose:

   ```yml
   # docker-compose.yml
   version: '3'
   services:
     feishu2md:
       image: wwwsine/feishu2md
       environment:
         FEISHU_APP_ID: <your id>
         FEISHU_APP_SECRET: <your secret>
         GIN_MODE: release
       ports:
         - "8080:8080"
   ```

   启动服务 `docker compose up -d`

   然后访问 https://127.0.0.1:8080 粘贴文档链接即可，文档链接可以通过 **分享 > 开启链接分享 > 复制链接** 获得。
</details>

<details>
  <summary>在线版本</summary>

  我使用个人的测试 API Token 部署了一个 Unstable 版本在 Render 平台上，该版本不会保存任何的文档资料和图片在容器中，直接通过 HTTP 从**内存**中返回压缩包文件，但是 Render 平台的 Log 可能会记录一些 HTTP 信息。

  在版本仅供不在意隐私或懒于配置的用户临时使用，也可用于测试对比是否自己的 Token 权限配置有问题。Render 平台使用免费配额，仅有 512M 内存，不保证高可用性，信任链全靠开源代码，请自行斟酌。

  访问 https://feishu2md.onrender.com/ 粘贴文档链接即可，文档链接可以通过 **分享 > 开启链接分享 > 复制链接** 获得。
</details>

## 感谢

- [chyroc/lark](https://github.com/chyroc/lark)
- [chyroc/lark_docs_md](https://github.com/chyroc/lark_docs_md)
  
<html>
<style>
    .mac {
        width:10px;
        height:10px;
        border-radius:5px;
        float:left;
        margin:10px 0 0 5px;
    }
    .b1 {
        background:#E0443E;
        margin-left: 10px;
    }
    .b2 { background:#DEA123; }
    .b3 { background:#1AAB29; }
    .warpper{
        background:#121212;
        border-radius:5px;
        width:400px;
    }
</style>
<div class="warpper">
    <div class="mac b1"></div>
    <div class="mac b2"></div>
    <div class="mac b3"></div>
<div>
<br>
</html>

```cpp
#include<iostream>
using namespace std;
int main(){
    return 0;
}
