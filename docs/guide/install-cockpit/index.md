# 安装管理面板
Cockpit 使 Linux 易于使用。您不必在命令行中记住命令。
在 Web 浏览器中查看服务器并使用鼠标执行系统任务。启动容器、管理存储、配置网络和检查日志都很容易。基本上，您可以将Cockpit视为图形化的“桌面界面”，但适用于单个服务器。
## 1、安装Cockpit
Cockpit 从版本 10 （Buster） 开始在 Debian 中可用。
安装或更新软件包：
```
. /etc/os-release
apt install -t ${VERSION_CODENAME}-backports cockpit pcp python3-pcp -y
```
## 2、安装Cockpit附属组件
**官方组件**  
1、虚拟机，在浏览器中创建、运行和管理虚拟机。（按需安装，非必要插件）
```
. /etc/os-release
apt install -t ${VERSION_CODENAME}-backports cockpit-machines -y
```
2、Podman 容器，在浏览器中下载、使用和管理容器。（按需安装，非必要插件）
```
. /etc/os-release
apt install -t ${VERSION_CODENAME}-backports cockpit-podman -y
```
**第三方组件**  
配置45Drives Repo安装脚本，安装脚本将自动检测您的发行版并将适当的文件添加到您的系统。该脚本还将保存任何与 45Drives 相关的旧存储库（如果存在）。
下面的命令将下载并运行脚本，而不会在您的系统上留下任何东西！
```
curl -sSL https://repo.45drives.com/setup | sudo bash
sudo apt update
```
1、Navigator文件浏览器，Cockpit 的特色文件浏览器。（推荐安装）
安装软件包：
```
sudo apt install cockpit-navigator -y
```
2、File Sharing，一个 Cockpit 插件，可轻松管理 Samba 和 NFS 文件共享。（推荐安装）
安装软件包：
```
sudo apt install cockpit-file-sharing -y
```
3、Cockpit Identities，用户和组管理插件。（推荐安装）
安装软件包：
```
sudo apt install cockpit-identities -y
```
4、Cockpit ZFS管理器。（按需安装，非必要插件）
安装ZFS：
```
sudo apt update
sudo apt install -y zfs-dkms zfsutils-linux
```
要求：
Cockpit: 201+；NFS (Optional)；Samba: 4+ (Optional)；ZFS: 0.8+；
安装：
```
git clone https://github.com/optimans/cockpit-zfs-manager.git
sudo cp -r cockpit-zfs-manager/zfs /usr/share/cockpit
```
## 3、Cockpit调优
自动注销闲置的用户
在您首选的文本编辑器中，在 /etc/cockpit/ 目录中打开或创建 cockpit.conf 文件，命令：
```
sudo vim /etc/cockpit/cockpit.conf
```
在文件中添加以下文本，以分钟为单位，这里表示为15分钟后自动退出：
```
[Session]
IdleTimeout=15
```
保存文件，重启Cockpit Web 控制台以使更改生效，命令：
```
systemctl try-restart cockpit
```
在登录页面中添加标题
在您首选的文本编辑器中创建 /etc/issue.cockpit 文件（如果您还没有该文件）。添加您要显示的内容作为文件的横幅。命令：
```
sudo vim /etc/cockpit/issue.cockpit
```
在文件中添加需要展示的内容：
基于Debian搭建HomeNAS！
内容添加完成后，保存这个文件。
在您首选的文本编辑器中，在 /etc/cockpit/ 目录中打开或创建 cockpit.conf 文件。
```
sudo vim /etc/cockpit/cockpit.conf
```
在文件中添加以下文本：
```
[Session]
Banner=/etc/cockpit/issue.cockpit
```
保存该文件，重启Cockpit Web 控制台以使更改生效，命令：
```
sudo systemctl try-restart cockpit
```
Nginx反向代理Cockpit
在您首选的文本编辑器中，在 /etc/cockpit/ 目录中打开或创建 cockpit.conf 文件，命令：
```
sudo vim /etc/cockpit/cockpit.conf
```
在文件中添加以下文本，将下面内容中的两处’cockpit.domain.tld’替换为你的域名(如为非标端口号，需将端口号一并填写上)，将192.168.1.10:9090修改为你对应的内网IP，就可以实现外网内网同时访问Cockpit管理面板：
```
[WebService]
Origins = https://cockpit.domain.tld wss://cockpit.domain.tld https://192.168.1.10:9090
ProtocolHeader = X-Forwarded-Proto
ForwardedForHeader = X-Forwarded-For
LoginTo = false
LoginTitle = HomeNAS
```
保存文件，重启Cockpit Web 控制台以使更改生效，命令：
```
sudo systemctl try-restart cockpit
```
Cockpit面板登陆后首页展示信息
配置文件路径：
```
sudo vim /etc/motd
```
原文：
```
The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
```
修改后：
我们信任您已经从系统管理员那里了解了日常注意事项。 总结起来无外乎这三点：
```
#1) 尊重别人的隐私。
#2) 输入前要先考虑(后果和风险)。
#3) 权力越大，责任越大。
```
防止暴力攻击Web登陆窗口
编辑defaults-debian.conf文件：
```
sudo vim /etc/fail2ban/jail.d/defaults-debian.conf
```
添加如下内容：
```
[sshd]
enabled = true
[pam-generic]
enabled = true
```
保存文件后重启Fail2ban：
```
sudo systemctl restart fail2ban
```
修改Web登陆端口
要更改其端口和/或地址，您应该将以下内容放入文件中：
```
/etc/systemd/system/cockpit.socket.d/listen.conf
```
在该路径中创建尚不存在的文件和目录。该ListenStream 选项指定所需的地址和 TCP 端口。
```
[Socket]
ListenStream=
ListenStream=443
```
注意：第一行的空值是故意的。systemd允许Listen在单个套接字单元中声明多个指令；插入文件中的空值会重置列表，从而禁用原始设备的默认端口 9090。
为了使更改生效，请运行以下命令：
```
sudo systemctl daemon-reload 
sudo systemctl restart cockpit.socket
```