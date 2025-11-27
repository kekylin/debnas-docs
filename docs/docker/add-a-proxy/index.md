# Debian 为 Docker 添加代理指引

> 方案依据 Docker 官方《Configure the Docker daemon to use a proxy server》文档整理。

> **使用建议**：本文提供三种不同层级的代理方式（CLI 用户级、daemon 全局级、容器运行期）。请选择最符合自身需求的一种即可，无需全部配置。

---

## 1. 适用场景与前置条件

- 系统：Debian 12.x/13.x（amd64），已安装 Docker Engine 与 systemd。
- 目的：在受限网络下，通过企业/个人 HTTP(S) 代理加速拉取镜像、转发 API 请求。
- 约束：以下命令必须以 root 身份运行。本指南涵盖 Docker daemon/客户端代理配置（用于拉取镜像）以及容器运行期代理配置（用于容器内部网络访问）。

---

## 2. CLI 代理：让拉镜像走代理

范围说明：

- 该配置写在“当前登录用户”的 `~/.docker/config.json` 中，**只对该用户执行的 Docker 命令生效**。例如用户 `root` 配置了，就能走代理；切换到用户 `nas`，若未创建自己的 `~/.docker/config.json`，则仍然直连。
- 适用于 `docker pull`、`docker login`、`docker compose pull` 等客户端命令。

### 2.1 一次性写入配置

```bash
mkdir -p ~/.docker
cat <<'CONF' > ~/.docker/config.json
{
  "proxies": {
    "default": {
      "httpProxy": "http://192.168.10.5:7890",
      "httpsProxy": "http://192.168.10.5:7890",
      "noProxy": "localhost,127.0.0.1,::1,.lan,192.168.10.0/24"
    }
  }
}
CONF
```

> `~` 代表当前登录用户的家目录，例如 root 为 `/root`，普通用户 `nas` 则是 `/home/nas`。请在自己的家目录下执行上述命令；若该用户目录缺少 `.docker`，命令会自动创建。  
> 如果代理需要账号密码，可以写成 `http://user:pass@proxy.example.com:port`。  
> **注意**：此配置仅影响 Docker 客户端与镜像仓库之间的流量，不会让容器内部访问互联网时自动走代理。若容器运行期也要走代理，请参照第 4 章为容器设置环境变量。

### 2.2 使用说明与常见问答

- **是否与当前目录有关？** 无关。只要运行命令的 **用户** 有 `~/.docker/config.json`，无论是在 `/root`、`/srv/docker` 还是任何目录执行 `docker pull`，都会自动走代理。示例：在 root 用户下写好配置后，进入 `/srv/docker` 执行 `docker pull alpine` 依旧生效。
- **多个用户如何处理？** 每个用户需要单独创建自己的 `~/.docker/config.json`。未配置的用户依旧直连。
- **是否会影响容器内部访问？** 不会，此配置仅影响 `docker` 命令与镜像仓库之间的流量。

### 2.3 实战验证

1. 拉取镜像：

   ```bash
   docker pull jellyfin/jellyfin:latest
   ```

2. 登录 Docker Hub（若需访问私有镜像）：

   ```bash
   docker login
   ```

3. Compose 批量拉取：

   ```bash
   cd /opt/docker/jellyfin
   docker compose pull
   ```

只要 `config.json` 写对，以上操作都会自动走代理，无需额外参数。

### 2.4 排查思路

- `docker info | grep -A3 Proxy` 可查看当前 CLI 正在使用的代理。
- 如果仍然拉取失败，确认代理软件对 Docker 端口是否放行，或尝试在 `noProxy` 中加入内网域名/IP（例如 `NO_PROXY=localhost,127.0.0.1,::1,192.168.10.0/24`）。

---

## 3. Daemon 代理：让所有用户统一走代理

范围说明：

- 配置文件位于 `/etc/docker/daemon.json`，作用对象是 `dockerd` 守护进程。**不论系统里哪个用户运行 Docker 命令，daemon 与外部 registry 建立的连接都会走这里的代理。**
- 适合多人共享主机或希望彻底统一出口的场景；但若只需给单个用户加速拉镜像，可以跳过本节。

### 3.1 编辑 daemon.json（含镜像加速示例）

以下示例展示了如何在同一个文件中同时保留项目常用的 3 个镜像加速地址，并新增代理配置：

```bash
mkdir -p /etc/docker
cat <<'CONF' > /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://docker.m.ixdev.cn",
    "https://docker.1ms.run",
    "https://docker.1panel.live"
  ],
  "proxies": {
    "default": {
      "httpProxy": "http://192.168.10.5:7890",
      "httpsProxy": "http://192.168.10.5:7890",
      "noProxy": "localhost,127.0.0.1,::1,192.168.10.0/24"
    }
  }
}
CONF
```

> 若当前登录的不是 root 用户，请在上述命令前加 `sudo`，或切换到 root 再执行，因为 `/etc/docker` 归属 root。

> 若原文件还有其他字段（如 `data-root`、`log-driver` 等），请一并保留下来，确保 JSON 结构合法。

### 3.2 重启并验证

```bash
systemctl restart docker
systemctl show --property=Environment docker
```

输出中可看到 `HTTP_PROXY` / `HTTPS_PROXY`，表示 daemon 已接收配置。此后任何用户执行 `docker pull`，守护进程都会统一走代理。

---

## 4. 运行期代理：让 Jellyfin 容器走代理

某些容器（例如下载器、订阅器、媒体刮削器）在运行期也需要访问公网，可通过环境变量方式传递代理：

### 4.1 docker run 示例

```bash
docker run -d \
  --name jellyfin \
  -p 8096:8096 \
  -v /opt/docker/jellyfin/config:/config \
  -v /opt/docker/jellyfin/cache:/cache \
  -v /media:/media \
  -e HTTP_PROXY=http://192.168.10.5:7890 \
  -e HTTPS_PROXY=http://192.168.10.5:7890 \
  -e NO_PROXY=localhost,127.0.0.1,::1,.lan,192.168.10.0/24 \
  jellyfin/jellyfin:latest
```

- 仅对 Jellyfin 生效，不影响其他容器。
- `NO_PROXY` 加入局域网域名/网段，确保访问 NAS、本地媒体库时不绕行代理。

### 4.2 docker compose 示例

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    ports:
      - 8096:8096
    volumes:
      - /opt/docker/jellyfin/config:/config
      - /opt/docker/jellyfin/cache:/cache
      - /media:/media
    environment:
      HTTP_PROXY: http://192.168.10.5:7890
      HTTPS_PROXY: http://192.168.10.5:7890
      NO_PROXY: localhost,127.0.0.1,::1,.lan,192.168.10.0/24
```

如不想把代理信息写进 compose，可改用变量文件形式，完整示例：

```bash
mkdir -p /opt/docker/jellyfin
cat <<'ENV' > /opt/docker/jellyfin/.env.proxy
HTTP_PROXY=http://192.168.10.5:7890
HTTPS_PROXY=http://192.168.10.5:7890
NO_PROXY=localhost,127.0.0.1,::1,.lan,192.168.10.0/24
ENV
```

```yaml
# /opt/docker/jellyfin/docker-compose.yml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    ports:
      - 8096:8096
    volumes:
      - /opt/docker/jellyfin/config:/config
      - /opt/docker/jellyfin/cache:/cache
      - /media:/media
    env_file:
      - .env.proxy
```

```bash
cd /opt/docker/jellyfin
docker compose --env-file .env.proxy up -d
```

> 两种方式任选其一：直接写 `environment` 方便单文件管理；`.env.proxy` 则便于在不同环境中复用，只需修改变量文件即可。

### 4.3 验证容器是否使用代理

```bash
docker exec -it jellyfin env | grep -E 'HTTP|NO_PROXY'
```

若输出包含代理变量，表示 Jellyfin 已获得配置。部分插件仍需手动在应用内指定代理，此处仅负责为容器提供标准环境变量。

---

## 5. 常见问题排查

| 现象 | 排查步骤 |
| --- | --- |
| `docker pull` 仍然直连/卡顿 | `docker info \| grep -A3 Proxy` 检查当前用户是否读取到代理；确认 `~/.docker/config.json` 所属用户与执行命令的用户一致；测试代理端口是否可达（如 `curl -x http://192.168.10.5:7890 https://www.google.com`）。 |
| `systemctl restart docker` 失败 | 多为 `/etc/docker/daemon.json` 格式错误或拼写错误。运行 `cat /etc/docker/daemon.json | jq .` 验证 JSON，查看 `journalctl -u docker -xe` 获取具体报错。 |
| 容器内依旧无法访问公网 | 确认 `docker exec 容器 env` 中是否存在 `HTTP_PROXY` 等变量；若无，检查 compose `env_file` 是否加载；若有仍失败，说明应用未读取标准变量，需要在程序内部单独设置。 |
| 业务访问内网资源失败 | 将 NAS/内网域名加入 CLI 或 daemon 的 `noProxy`，示例：`NO_PROXY=localhost,127.0.0.1,::1,.lan,192.168.10.0/24`，并重新加载配置。 |

> 若代理使用自签名证书，请把 CA 证书安装到主机，并在 `/etc/docker/certs.d/<registry>/ca.crt` 或 `daemon.json` 的 `tlscacert` 中声明，否则 TLS 握手会被拒绝。

---

## 参考资料

- [Docker Docs — Configure the Docker daemon to use a proxy server](https://docs.docker.com/engine/daemon/proxy/)
