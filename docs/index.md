---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "DebNAS"
  text: "基于Debian搭建HomeNAS"
  tagline: 一个开源生态驱动的 HomeNAS 解决方案
  image:
    src: /debian-logo.png
    alt: DebNAS Hero Image
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: Github
      link: https://github.com/kekylin/debnas
features:
  - title: 开源
    details: 项目基于 Debian，使用开源脚本和组件，用户可自由访问、修改和分发代码，促进透明与协作。
  - title: 安全
    details: 依托 Debian 安全机制，整合防火墙、Fail2ban、登录通知及权限限制，构建多层防护体系。
  - title: 稳定
    details: 利用 Debian 软件包管理和长期支持，结合自动化脚本与 Cockpit 监控，确保系统稳定运行。
  - title: 高效
    details: 采用 Debian 最小化安装，避免资源浪费，脚本优化配置，用户按需安装应用，保持轻量高效。
  - title: 自由
    details: 提供完全控制权，用户可灵活修改配置、权限和功能，定制无限制，满足多样化需求。
  - title: 易用
    details: 通过 Cockpit 图形界面和自动化脚本，简化系统配置与管理，降低技术门槛。
---