<p align="center">
  <img src="https://github.com/1esse/vue-clownfish-admin/blob/master/logo.png" alt="logo">
</p>
<h3 align="center">Vite + Vue3 + Antd + Typescript 管理后台前端简易框架</h3>
<p align="center">
  <a href="https://github.com/vuejs/core">
    <img src="https://img.shields.io/badge/vue-3.2.37-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vitejs/vite">
    <img src="https://img.shields.io/badge/vite-2.9.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/pinia">
    <img src="https://img.shields.io/badge/pinia-2.0.14-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/router">
    <img src="https://img.shields.io/badge/vueRouter-4.0.15-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vueComponent/ant-design-vue">
    <img src="https://img.shields.io/badge/antdv-3.2.5-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://github.com/1esse/vue-clownfish-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/1esse/vue-clownfish-admin/releases">
    <img src="https://img.shields.io/github/v/release/1esse/vue-clownfish-admin.svg" alt="GitHub release">
  </a>
</p>

简体中文 | [English](https://github.com/1esse/vue-clownfish-admin/blob/master/README.en.md)

#### 这里是antd版本，如果你更倾向于使用element-plus，请[点击这里](https://github.com/1esse/vue-clownfish-admin-elem)。

## 🐬 简介
[vue-clownfish-admin](https://github.com/1esse/vue-clownfish-admin) 是一个由Vue最新技术栈开发的后台管理前端简易框架。基于vue3，集成vue3最新生态系统的核心库实现。主要的技术栈有
[ES2015+](http://es6.ruanyifeng.com/)，[typescript](https://www.typescriptlang.org/zh/)，[vue3](https://staging-cn.vuejs.org)，[pinia](https://pinia.vuejs.org/)，[vue-router](https://router.vuejs.org/zh/)，[vite](https://cn.vitejs.dev/)，[antd](https://antdv.com/)，了解这些技术会让你更容易入手此项目。此项目基于`vite`构建，并使用`vue3`作为开发技术，所以[只针对现代浏览器做开发](https://cn.vitejs.dev/guide/build.html#browser-compatibility)，不支持低版本的浏览器（如ie），如有需要请自行添加`polyfill`进行适配。
+ [在线预览](https://1esse.github.io/vue-clownfish-admin)

如果你熟悉[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)，那么你可以更快地上手此项目。作者本人之前也是vue-element-admin的深度使用者，对vue-element-admin表示感谢的同时也注意到了哪些可以再优化，所以一直想把心里的优化方案实现。在技术不断更新迭代的今天，站在巨人的肩膀上，终于使用vue3实现了一版。由于时间原因，该项目没有集成各种案例实现，只提供管理系统前端的基本架构。对标的是[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)。

## 🦑 优势
+ 技术：使用vue最新技术栈开发
+ 纯净：无集成mockjs，案例展示等，可根据自己需求进行配置
+ 布局：布局组件解耦，可轻易切换，替代组件
+ 轻量：框架实现代码行数少，容易学习并快速上手

## 🐳 主要功能
+ 根据路由配置自动生成侧边栏菜单（支持多层嵌套和外链）
+ 根据当前路由信息动态生成面包屑
+ 导航标签页（右键弹出菜单，支持页面刷新，关闭）
+ 侧边栏菜单、面包屑、标签页都支持icon图标(antd图标和svg)
+ 根据路由配置动态缓存页面
+ 路由权限配置
+ Svg Sprite 图标
+ 自动注册全局组件（antd组件及components/*.vue）
+ 支持原生CSS变量和CSSWG草案规定进行开发，编写符合未来标准的css
+ 自动为css代码添加前缀，使样式适配不同浏览器
+ 支持使用JSX/TSX进行开发

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
+ dev：本地开发预览
+ build：打包项目代码
+ preview：预览打包后的项目

## 🦐 预览项目
[在线预览](https://1esse.github.io/vue-clownfish-admin)

## 🐡 其他
项目基本架构搭建完成，即将启动页面功能解决方案的开发。

由于这是一个业余时间的个人开源项目，作者时间有限，并非全职开发，更新较慢敬请谅解。

如果你有你的想法，也欢迎提pr参与项目开发。

如果觉得好用，可以点个⭐支持一下。

也可以帮作者买杯☕以表支持。

![捐赠](http://rdrot0fj6.hn-bkt.clouddn.com/paycode.png)

如果遇到项目任何问题欢迎提[issue](https://github.com/1esse/vue-clownfish-admin/issues/new)。

## 🐙 License
[MIT License](https://github.com/1esse/vue-clownfish-admin/blob/master/LICENSE)

Copyright	&copy; 2022-present ZhaoJieXin