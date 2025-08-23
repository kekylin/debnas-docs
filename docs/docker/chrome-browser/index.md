---
title: Docker版Chrome浏览器部署教程
---

# Docker版Chrome浏览器部署教程

## 概述

本教程将指导您如何在DebNAS系统中使用Docker部署Chrome浏览器，实现远程浏览器访问功能。支持Chrome、Edge、Firefox等多种浏览器。

## 前置条件

- 已安装Docker和Docker Compose
- 确保系统有足够的内存和存储空间
- 网络连接正常

## 部署步骤

### 1. 阅读项目文档

#### Chrome浏览器
- 项目地址：https://github.com/linuxserver/docker-chromium

#### Edge浏览器
- 项目地址：https://github.com/linuxserver/docker-msedge

#### Firefox浏览器
- 项目地址：https://github.com/linuxserver/docker-firefox

### 2. 配置国内镜像源

为了解决中文字体安装问题，需要配置国内镜像源。

创建 `sources.list` 文件，内容如下：

```bash
deb https://mirrors.bfsu.edu.cn/debian/ bookworm main contrib non-free non-free-firmware
deb https://mirrors.bfsu.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware
deb https://mirrors.bfsu.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware
deb https://mirrors.bfsu.edu.cn/debian-security bookworm-security main contrib non-free non-free-firmware
```

### 3. 部署配置

#### Docker CLI 方式

```bash
docker run -d \
  --name=chromium \
  --hostname=chromium \
  --security-opt=no-new-privileges:true \
  --security-opt seccomp=unconfined \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  -e CUSTOM_USER=admin \
  -e PASSWORD=admin \
  -e DOCKER_MODS=linuxserver/mods:universal-package-install \
  -e INSTALL_PACKAGES=fonts-noto-cjk \
  -e LC_ALL=zh_CN.UTF-8 \
  -e TITLE=Chromium \
  -p 3000:3000 \
  -p 3001:3001 \
  -v /opt/docker/chromium:/config \
  -v /opt/docker/chromium/sources.list:/etc/apt/sources.list \
  --shm-size="2gb" \
  --restart unless-stopped \
  linuxserver/chromium:latest
```

#### Docker Compose 方式

创建 `docker-compose.yml` 文件：

```yaml
services:
  chromium:
    image: linuxserver/chromium:latest
    container_name: chromium
    hostname: chromium
    security_opt:
      - no-new-privileges:true
      - seccomp=unconfined
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
      - CUSTOM_USER=admin
      - PASSWORD=admin
      - DOCKER_MODS=linuxserver/mods:universal-package-install
      - INSTALL_PACKAGES=fonts-noto-cjk
      - LC_ALL=zh_CN.UTF-8
      - TITLE=Chromium
    volumes:
      - /opt/docker/chromium:/config
      - /opt/docker/chromium/sources.list:/etc/apt/sources.list
    ports:
      - 3000:3000
      - 3001:3001
    shm_size: 2gb
    restart: unless-stopped
```

### 4. 启动容器

```bash
docker compose up -d
```

### 5. 访问浏览器

启动成功后，通过浏览器访问：
- 地址：`http://your-server-ip:3000`
- 用户名：`admin`
- 密码：`admin`

## 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `PUID` | 用户ID | 1000 |
| `PGID` | 组ID | 1000 |
| `TZ` | 时区 | Asia/Shanghai |
| `CUSTOM_USER` | 登录用户名 | admin |
| `PASSWORD` | 登录密码 | admin |
| `TITLE` | 浏览器标题 | Chromium |

### 端口映射

- `3000:3000` - 主要访问端口
- `3001:3001` - 备用端口

### 数据持久化

- `/opt/docker/chromium:/config` - 浏览器配置和数据持久化
- `/opt/docker/chromium/sources.list:/etc/apt/sources.list` - 镜像源配置

## 其他浏览器部署

Edge浏览器和Firefox浏览器的部署思路与Chrome相同，只需要更换对应的镜像即可：

- **Edge**: `linuxserver/msedge:latest`
- **Firefox**: `linuxserver/firefox:latest`

## 常见问题

### 中文字体显示问题
确保已正确配置国内镜像源，并安装 `fonts-noto-cjk` 字体包。

### 内存不足
建议分配至少2GB的共享内存（`--shm-size="2gb"`）。

## 相关链接

- [LinuxServer.io Chromium](https://github.com/linuxserver/docker-chromium)
- [LinuxServer.io Edge](https://github.com/linuxserver/docker-msedge)
- [LinuxServer.io Firefox](https://github.com/linuxserver/docker-firefox)
