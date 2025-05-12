# 系统初始化
## 1、更换国内镜像源
切换至root用户：
```
su –
```
输入root用户密码（密码不显示），然后按下回车键确定，系统输出显示如下：
```
root@debian:~#
```
Debian 的软件源配置文件是/etc/apt/sources.list。将系统自带的该文件做个备份，将该文件替换为下面内容，即可使用 TUNA 的软件源镜像。
首先备份/etc/apt/sources.list，命令：
```
cp /etc/apt/sources.list /etc/apt/sources.list.bak
```
修改sources.list文件，复制下面命令到终端运行，此镜像源适用于Debian 12系统：
```
cat <<EOF > /etc/apt/sources.list
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bookworm-security main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security bookworm-security main contrib non-free non-free-firmware
EOF
```
## 2、更新系统
```
apt update && apt upgrade -y
```
Debian Buster 以上版本默认支持 HTTPS 源。如果遇到无法拉取 HTTPS 源的情况，请先使用 HTTP 源并安装：
```
apt-get install apt-transport-https ca-certificates -y
```
## 3、安装初始必备软件
输入下面命令安装基础必备软件，命令：
```
apt install -y sudo curl git vim wget exim4 gnupg apt-transport-https ca-certificates smartmontools
```
## 4、添加用户至sudo组
添加安装系统时创建的第一个至sudo组，以方便我们后续管理系统，执行命令：
```
usermod -aG sudo user_name
```
请将user_name替换为要添加的用户名。