# 快速开始
## 安装系统
安装教程：[Debian系统最小化安装教程](/guide/debian-minimal-installation/)

安装教程：[Ubuntu系统最小化安装教程](/guide/ubuntu-minimal-installation/)
## 连接系统
系统安装完成后，使用SSH工具连接上系统，输入下面运行脚本命令开启脚本。  
> 注意：  
> 1、Debian默认禁止root账户直接通过SSH连接，所以用安装系统时创建的第一个普通用户账号进行登录。  
> 2、登陆后，必须使用以下命令切换到root账户运行脚本。  
> 3、对于Ubuntu系统，不需先切换root账号，直接运行脚本命令即可。  
  ```
su -
  ```

## 运行脚本
运行脚本前，建议先阅读[脚本介绍](/guide/script-introduction/)，了解脚本能做什么先，脚本中的选项可以按需执行。运行脚本命令（二选一）  

Github地址
  ```
SUDO=$(command -v sudo); ${SUDO:-} bash -c "bash <(wget -O- https://raw.githubusercontent.com/kekylin/Debian-HomeNAS/refs/heads/main/Shell/homenas.sh) -s github"
  ```
Gitee地址（国内用户推荐）
  ```
SUDO=$(command -v sudo); ${SUDO:-} bash -c "bash <(wget -O- https://gitee.com/kekylin/Debian-HomeNAS/raw/main/Shell/homenas.sh) -s gitee"
  ```

## 登陆使用
> **脚本执行完毕后，查看SSH工具显示的Cockpit面板管理地址和Docker管理工具地址，打开对应服务进行使用。**

Cockpit  
一个基于 Web 的服务器图形界面，在 Web 浏览器中查看您的服务器并使用鼠标执行系统任务。启动容器、管理存储、配置网络和检查日志都很容易。基本上，您可以将 Cockpit 视为图形“桌面界面”。
Cockpit是直接使用系统账户进行登陆使用，出于安全考虑，Cockpit默认禁用root账户登陆，建议使用您安装系统时创建的第一个用户登陆。
  ```
https://localhost:9090
  ```
Portainer  
一个Docker的可视化工具，可提供一个交互界面显示Docker的详细信息供用户操作。功能包括状态显示、应用模板快速部署、容器镜像网络数据卷的基本操作（包括上传下载镜像，创建容器等操作）、事件日志显示、容器控制台操作、Swarm集群和服务等集中管理和操作、登录用户管理和控制等功能。
  ```
https://localhost:9443
  ```