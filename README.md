<p align="center">
  <img src="https://1esse.github.io/vue-clownfish-admin/assets/logo.dadfed0b.png" alt="logo">
</p>
<h3 align="center">Vite + Vue3 + Antd + Typescript 管理后台前端简易框架</h3>
<p align="center">
  <a href="https://github.com/vuejs/core">
    <img src="https://img.shields.io/badge/vue-3.2.38-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vitejs/vite">
    <img src="https://img.shields.io/badge/vite-3.0.9-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/pinia">
    <img src="https://img.shields.io/badge/pinia-2.0.21-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/router">
    <img src="https://img.shields.io/badge/vueRouter-4.1.5-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vueComponent/ant-design-vue">
    <img src="https://img.shields.io/badge/antdv-3.2.11-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://github.com/1esse/vue-clownfish-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/1esse/vue-clownfish-admin/releases">
    <img src="https://img.shields.io/github/v/release/1esse/vue-clownfish-admin.svg" alt="GitHub release">
  </a>
</p>

## 🐬 简介
[vue-clownfish-admin](https://github.com/1esse/vue-clownfish-admin) 是一个由Vue最新技术栈开发的后台管理前端简易框架。基于vue3，集成vue3最新生态系统的核心库实现。主要的技术栈有
[ES2015+](http://es6.ruanyifeng.com/)，[typescript](https://www.typescriptlang.org/zh/)，[vue3](https://staging-cn.vuejs.org)，[pinia](https://pinia.vuejs.org/)，[vue-router](https://router.vuejs.org/zh/)，[vite](https://cn.vitejs.dev/)，[antd](https://antdv.com/)，了解这些技术会让你更容易入手此项目。此项目基于`vite`构建，并使用`vue3`作为开发技术，所以[只针对现代浏览器做开发](https://cn.vitejs.dev/guide/build.html#browser-compatibility)，不支持低版本的浏览器（如ie）。


## 🦑 优势
+ 几乎使用当前前端最新技术开发（vite, vue3, ts, pinia）
+ 布局组件解耦，可轻易切换，替代组件
+ 轻量模板，学习成本低

## 🐳 主要功能
+ 动态生成侧边栏菜单（支持多层嵌套和外链）
+ 动态生成面包屑
+ 导航标签页（拖拽排序，右键弹出菜单，页面刷新等）
+ 侧边栏菜单、面包屑、标签页都支持icon图标(antd图标和svg)
+ 根据路由配置动态缓存页面
+ 动态路由页面
+ 动态菜单
+ 路由权限配置
+ 自动为css代码添加前缀，使样式适配不同浏览器
+ 支持使用JSX/TSX进行开发
+ 支持mock模拟接口
+ 多环境配置

## 🦀 开发准备
    # 克隆项目
    git clone https://github.com/1esse/vue-clownfish-admin.git
    
    # 进入目录
    cd vue-clownfish-admin
    
    # 下载依赖包
    npm install # 使用npm
    yarn # 使用yarn
    
    # 启动项目
    npm run dev # 使用npm
    yarn dev # 使用yarn

## 🐠 scripts命令
+ dev：本地开发
+ stage: 预发布环境开发
+ build：打包项目代码
+ build:stage: 打包预发布环境代码
+ preview：预览打包后的项目

## 🐟了解这些可能会有帮助
1. 定义在src/components下的组件，可在页面的template直接使用，不必导入（tsx除外）。
2. 不需要对flex，grid等css样式进行多浏览器适配，框架已配置了自动适配。
3. 大部分场景推荐使用rem代替px以适配更多不同分辨率屏幕

## 🦐 其他
[在线预览](https://1esse.github.io/vue-clownfish-admin)
[ElementPlus版本](https://github.com/1esse/vue-clownfish-admin-elem)

## 🐙 License
[MIT License](https://github.com/1esse/vue-clownfish-admin/blob/master/LICENSE)

Copyright	&copy; 2022-present ZhaoJieXin
