## 脚本介绍
- 提示：脚本中的每一个选项都可以单独运行。
### 一、系统初始配置
#### 1.1、配置软件源
- 更换软件源为清华大学镜像源
#### 1.2、安装必备软件
- 安装初始必备软件（curl git vim wget exim4 gnupg apt-transport-https ca-certificates smartmontools）。  
- 添加第一个创建的用户（ID：1000）至sudo组。
### 二、系统管理面板
#### 2.1、安装面板Cockpit
- 配置45Drives Repo安装脚本（用于安装Navigator、File Sharing、Identities组件）。  
- 安装Cockpit及其附属组件（Navigator、File Sharing、Identities组件）。  
- 配置Cockpit首页展示信息。  
- 安装Tuned系统性能调优工具（设置高性能模式、低功耗模式等等）。  
- Cockpit调优，设置自动注销闲置，登陆界面公告，获取外网访问真实IP地址、设置登录屏幕的浏览器标题。  
#### 2.2、安装虚拟机组件
- 安装 cockpit-machines 组件（虚拟机组件）。  
- 开启IP包转发功能（解决虚拟机IP分配问题）。  
#### 2.3、外网访问Cockpit
- 因Cockpit默认禁止内网IP以外地址访问，所以要想从内网以外地址访问，必须设置可信域名至/etc/cockpit/cockpit.conf配置文件中。因此需要在此输入你的Cockpit服务外网访问域名 (如为非标端口号，需将端口号一并填写上)。
#### 2.4、删除外网访问配置
- 如果在2.3外网访问Cockpit那里设置了域名，Cockpit只能通过设置的域名和当前内网IP地址访问，因此如果外网访问域名或内网IP发生变动，可以通过执行此项取消限制。删除外网访问配置后，可通过内网任意IP访问。
#### 2.5、设置Cockpit管理网络
- Cockpit适配的网络管理工具为NetworkManager，而Debian系统默认网络管理工具为network，Ubuntu系统默认网络管理工具为netplan。因此要通过Cockpit进行网络管理，需要将系统网络管理工具切换为NetworkManager。更换系统网络管理工具，可能会产生IP变动，如更换后原IP无法正常访问服务，请确认是否分配了新IP地址。
### 三、邮件通知服务
#### 3.1、设置发送邮件账户
- 实现通过exim4发送邮件通知。  
- 需要提前准备好发送邮件的QQ邮箱账户和授权密码，强调一下，只能是QQ邮箱账户。  
- 授权码获取帮助：https://service.mail.qq.com/detail/0/75  
#### 3.2、用户登录发送通知
- 实现系统用户登陆时发送告警通知，避免账户泄漏而未发现。这里需要设置一个接收通知的任意邮箱账户。
#### 3.3、取消用户登陆通知
- 取消接收用户登陆通知。
### 四、系统安全防护
#### 4.1、配置基础安全防护
- 限制非sudo组用户使用su命令切换到root的用户。  
- 超时自动注销系统用户登陆状态。  
- 记录所有用户的登录和操作日志。  
#### 4.2、安装防火墙服务
- 安装firewalld防火墙服务。默认情况是出口放行，入口需手动配置放行端口，脚本默认放行了22（SSH）、546（dhcpv6-client）、9090（Cockpit）端口。可通过Cockpit面板网络选项手动添加其他端口。
#### 4.3、安装自动封锁服务
- 安装Fail2ban防暴力攻击服务，若登录系统失败5次，访问IP将封禁1小时，默认只守护SSH服务、Cockpit服务。  
- 设置一个邮箱账户接收被暴力攻击时告警通知。  
- 设置防护Cockpit，默认只防护SSH服务。  
### 五、Docker服务
#### 5.1、安装Docker
- 设置使用清华镜像源安装Docker  
- 安装 docker-ce、ocker-compose-plugin等相关组件  
- 添加第一个创建的用户（ID：1000）至docker组  
#### 5.2、添加镜像地址
- 添加Docker镜像加速地址，解决国内无法拉取镜像问题。
#### 5.3、安装容器应用
- 安装一些常用的docker容器应用，根据自己需求选择安装。  
- dockge：一个docker容器管理工具，旨在简化管理多个 Docker Compose 文件的过程。  
- nginx-ui：简单易用的Nginx管理界面，可以实现SSL证书续签、反向代理等等功能。  
- portainer：一个轻量级的管理 UI ，可让你轻松管理Docker。此为官方英文原版。  
- portainer_zh-cn: portainer的中文版本，非官方。  
- scrutiny: 一款基于web端的硬盘状态查看与监控工具。  
#### 5.4、备份与恢复
- 实现备份docker，默认备份的文件有/var/lib/docker、/etc/docker和/opt/docker三个目录。  
- docker_backup.conf 配置文件支持自定义备份参数，docker_backup.conf 文件可以存放在任意位置，备份时按脚本指示输入文件路径即可。  
docker_backup.conf 配置文件地址：https://raw.githubusercontent.com/kekylin/Debian-HomeNAS/refs/heads/main/Docs/docker_backup.conf

- 恢复已备份的docker文件，支持清空恢复（先清空目标目录再恢复）和增量恢复（覆盖同名文件，保留目标目录中备份源没有的文件）。  
### 六、综合应用服务
#### 6.1、安装服务查询
- 查询通过脚本安装的服务访问地址及端口。
#### 6.2、内网穿透服务
- 安装免费内网穿透服务tailscale，日常管理服务器够用的。
#### 6.3、自动更新hosts
- 自动更新 github, docker 和 tmdb 的 IP 地址。提供单次更新，定时更新多种选择。
### 七、一键配置HomeNAS
#### 7.1、基础版
- 一键自动执行：配置软件源、安装必备软件、安装面板Cockpit、安装Docker、添加镜像地址、安装服务查询脚本。
#### 7.2、安全版
- 一键自动执行：配置软件源、安装必备软件、安装面板Cockpit、设置发送邮件账户、用户登录发送通知、配置基础安全防护、安装防火墙服务、安装自动封锁服务、安装Docker、添加镜像地址、安装服务查询脚本。
### 零、退出
- 退出脚本。
