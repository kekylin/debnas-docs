import { defineConfig } from 'vitepress'
export default defineConfig({
  base: '/debnas-docs/',
  lang: 'zh-CN',
  title: 'DebNAS',
  description: 'DebNAS：一个开源生态驱动的 HomeNAS 解决方案',
  head: [
    ['link', { rel: 'icon', href: '/debnas-docs/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'DebNAS, Debian, NAS, 开源, 家庭存储, 多媒体' }],
    ['meta', { name: 'description', content: 'DebNAS：一个开源生态驱动的 HomeNAS 解决方案' }]
  ],
  themeConfig: {
    logo: '/debian-logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: 'DebNAS文档', link: '/guide/what-is-debnas/' },
      { text: 'Docker教程', link: '/docker/dockerhub-mirror/' },
      { text: '关于', link: '/about/disclaimer/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          collapsed: false,
          items: [
            { text: '什么是DebNAS', link: '/guide/what-is-debnas/' },
            { text: '脚本介绍', link: '/guide/script-introduction/' },
            { text: '成果展示', link: '/guide/achievement/' }
          ]
        },
        {
          text: '安装',
          collapsed: false,
          items: [
            {
              text: '安装系统',
              items: [
                { text: 'Debian', link: '/guide/debian-minimal-installation/' },
                { text: 'Ubuntu', link: '/guide/ubuntu-minimal-installation/' }
              ]
            },
            { text: '快速开始', link: '/guide/getting-started/' },
            {
              text: '手动配置',
              items: [
                { text: '概述', link: '/guide/overview/' },
                { text: '系统初始化', link: '/guide/system-init/' },
                { text: '安装管理面板', link: '/guide/install-cockpit/' },
                { text: '系统调优', link: '/guide/system-optimize/' },
                { text: '安全防护', link: '/guide/security/' },
                { text: '存储管理', link: '/guide/storage-management/' },
                { text: '安装Docker', link: '/guide/install-docker/' }
              ]
            }
          ]
        },
        {
          text: '扩展教程',
          collapsed: false,
          items: [
            { text: '虚拟机使用教程', link: '/guide/vm-usage/' },
            { text: '虚拟安装黑群晖系统', link: '/guide/synology-vm/' },
            { text: '启用SMB文件共享', link: '/guide/smb-sharing/' },
            { text: 'Nginx反代限制国外IP访问', link: '/guide/nginx-foreign-ip-block/' },
            { text: '内网穿透服务Tailscale', link: '/guide/tailscale-tunnel-service/' }
          ]
        },
        {
          text: '实用脚本',
          collapsed: false,
          items: [
            { text: '自动更新 Hosts 脚本', link: '/guide/hosts-update/' },
            { text: '安装 Tailscale 脚本', link: '/guide/install-tailscale/' }
          ]
        },
        {
          text: '问答',
          collapsed: false,
          items: [
            { text: '常见问题', link: '/guide/faq-debnas/' },
            { text: '故障排除', link: '/guide/troubleshooting/' }
          ]
        }
      ],
      '/docker/': [
        {
          text: '实用配置',
          collapsed: false,
          items: [
            { text: '镜像加速地址', link: '/docker/dockerhub-mirror/' },
            { text: '修改默认存储', link: '/docker/default-storage/' },
            { text: '添加代理', link: '/docker/add-a-proxy/' }
          ]
        },
        {
          text: '部署容器',
          collapsed: false,
          items: [
            {
              text: '容器管理',
              items: [
                { text: 'Dockge', link: '/docker/dockge/' },
                { text: 'Portainer', link: '/docker/portainer/' }
              ]
            },
            {
              text: '导航主页',
              items: [
                { text: 'Homepage', link: '/docker/homepage/' },
                { text: 'Heimdall', link: '/docker/heimdall/' }
              ]
            },
            {
              text: '系统监测',
              items: [
                { text: 'Grafana', link: '/docker/grafana/' },
                { text: 'Ward', link: '/docker/ward/' }
              ]
            },
            {
              text: '网络访问',
              items: [
                { text: 'Nginx-UI', link: '/docker/nginx-ui/' },
                { text: 'NixVis', link: '/docker/nixvis/' },
                { text: 'Nginx Proxy Manager', link: '/docker/nginx-proxy-manager/' }
              ]
            },
            {
              text: '文件管理',
              items: [
                { text: 'AList', link: '/docker/alist/' },
                { text: 'FileBrowser', link: '/docker/filebrowser/' },
                { text: 'NextCloud', link: '/docker/nextcloud/' }
              ]
            },
            {
              text: '影音视听',
              items: [
                { text: 'Jellyfin', link: '/docker/jellyfin/' },
                { text: 'MoviePilot', link: '/docker/moviepilot/' },
                { text: 'Navidrome', link: '/docker/navidrome/' }
              ]
            },
            {
              text: '下载服务',
              items: [
                { text: 'qBittorrent', link: '/docker/qbittorrent/' },
                { text: 'Transmission', link: '/docker/transmission/' }
              ]
            },
            {
              text: '照片管理',
              items: [
                { text: 'Immich', link: '/docker/immich/' }
              ]
            },
            {
              text: '轻量博客',
              items: [
                { text: 'Halo', link: '/docker/halo/' }
              ]
            },
            {
              text: '综合类别',
              items: [
                { text: 'Scrutiny', link: '/docker/scrutiny/' },
                { text: 'Chrome浏览器', link: '/docker/chrome-browser/' }
              ]
            }
          ]
        }
      ],
      '/about/': [
        {
          text: '关于 DebNAS',
          items: [
            { text: '免责声明', link: '/about/disclaimer/' },
            { text: '支持与赞赏', link: '/about/support-and-appreciation/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kekylin/Debian-HomeNAS' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/381396284' }
    ],
    footer: {
      message: '基于 <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GPL-3.0 许可</a> 发布',
      copyright: '版权所有 © 2020-至今 kekylin'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    returnToTopLabel: '返回顶部',
    outline: {
      label: '本页目录'
    },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    lastUpdated: {
      text: '更新于'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  }
})