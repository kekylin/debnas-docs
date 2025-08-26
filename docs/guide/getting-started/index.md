## 快速开始
### 1、安装系统
[Debian系统最小化安装教程](https://kekylin.github.io/debnas-docs/guide/debian-minimal-installation/)  

### 2、连接系统
系统安装完成后，通过 SSH 工具连接目标主机，并执行以下命令运行自动化配置脚本。。  
> 注意事项：  
> 1、Debian 默认禁止 root 用户通过 SSH 登录，请使用首次安装时创建的普通用户账户登录；  
> 2、登录后需使用 su - 切换为 root 账户执行脚本；。  
  ```shell
su -
  ```

### 3、运行脚本
建议在执行前阅读[脚本介绍](https://kekylin.github.io/debnas-docs/guide/script-introduction/)，了解脚本模块与执行选项。下面运行脚本命令（二选一）  

Github地址
  ```shell
bash <(wget -qO- https://raw.githubusercontent.com/kekylin/debnas/main/install.sh) -s github@main
  ```
Gitee地址（国内用户推荐）
  ```shell
bash <(wget -qO- https://gitee.com/kekylin/debnas/raw/main/install.sh) -s gitee@main
  ```
- `-s` 参数格式：平台@分支名，如 `-s github@main`、`-s gitee@dev`

### 4、登陆使用
> **脚本执行完毕后，SSH 控制台将输出 Cockpit 与 Docker 管理平台地址，请按提示登录访问。**

Cockpit  
一个基于 Web 的服务器图形界面，在 Web 浏览器中查看您的服务器并使用鼠标执行系统任务。启动容器、管理存储、配置网络和检查日志都很容易。基本上，您可以将 Cockpit 视为图形“桌面界面”。
Cockpit是直接使用系统账户进行登陆使用，出于安全考虑，Cockpit默认禁用root账户登陆，建议使用您安装系统时创建的第一个用户登陆。
  ```shell
https://localhost:9090
  ```
Portainer  
一个Docker的可视化工具，可提供一个交互界面显示Docker的详细信息供用户操作。功能包括状态显示、应用模板快速部署、容器镜像网络数据卷的基本操作（包括上传下载镜像，创建容器等操作）、事件日志显示、容器控制台操作、Swarm集群和服务等集中管理和操作、登录用户管理和控制等功能。
  ```shell
https://localhost:9443
  ```