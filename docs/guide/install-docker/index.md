# Docker服务
## 1、容器管理
在新主机上首次安装 Docker Engine 之前，需要设置 Dockerapt存储库。之后，您可以从存储库安装和更新 Docker。
1、设置 Docker 的apt存储库：
```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
2、安装 Docker Engine、containerd 和 Docker Compose。
```
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
3.hello-world通过运行镜像验证 Docker Engine 安装是否成功（可选） ：
```
sudo docker run hello-world
```
查看Docker版本命令：
```
sudo docker version
```
查看Docker Compose版本命令：
```
sudo docker compose version
```
3、卸载 Docker 引擎
3.1、卸载 Docker Engine、CLI、containerd 和 Docker Compose 包：
```
# Docker Engine, CLI, containerd, and Docker Compose packages
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```
3.2、主机上的图像、容器、卷或自定义配置文件不会自动删除。删除所有镜像、容器和卷：
```
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```
您必须手动删除任何已编辑的配置文件。
> 来源：https://docs.docker.com/engine/install/debian/

4、配置国内镜像源
```
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://0b27f0a81a00f3560fbdc00ddd2f99e0.mirror.swr.myhuaweicloud.com",
    "https://ypzju6vq.mirror.aliyuncs.com",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
EOF
systemctl daemon-reload
systemctl restart docker
```
## 2、容器管理
Portainer是一个可视化的容器镜像的图形管理工具，利用Portainer可以轻松构建，管理和维护Docker环境。 而且完全免费，基于容器化的安装方式，方便高效部署。
请将路径`/srv/volume_1/data/docker/portainer`替换为您的，此路径存储Portainer配置文件。
```
sudo docker run -d -p 8000:8000 -p 9443:9443 -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v /srv/volume_1/data/docker/portainer:/data portainer/portainer-ce:latest
```
安装完成后，可以通过打开 Web 浏览器并转到Portainer管理界面：
`http://localhost:9000`或`https://localhost:9443`
