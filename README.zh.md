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

#### 这里是antd版本，如果你更倾向于使用element-plus，请[点击这里](https://github.com/1esse/vue-clownfish-admin-elem)。

## 🐬 简介
[vue-clownfish-admin](https://github.com/1esse/vue-clownfish-admin) 是一个由Vue最新技术栈开发的后台管理前端简易框架。基于vue3，集成vue3最新生态系统的核心库实现。主要的技术栈有
[ES2015+](http://es6.ruanyifeng.com/)，[typescript](https://www.typescriptlang.org/zh/)，[vue3](https://staging-cn.vuejs.org)，[pinia](https://pinia.vuejs.org/)，[vue-router](https://router.vuejs.org/zh/)，[vite](https://cn.vitejs.dev/)，[antd](https://antdv.com/)，了解这些技术会让你更容易入手此项目。此项目基于`vite`构建，并使用`vue3`作为开发技术，所以[只针对现代浏览器做开发](https://cn.vitejs.dev/guide/build.html#browser-compatibility)，不支持低版本的浏览器（如ie），如有需要请自行添加`polyfill`进行适配。
+ [在线预览](https://1esse.github.io/vue-clownfish-admin)
+ [在线预览](http://rcui6i1mn.hn-bkt.clouddn.com/index.html)（国内用户访问）

此项目为纯净项目，没有集成任何无关此项目的功能代码，仅有的少许你可能用不到的代码仅作此项目的功能示例供参考。站在巨人的肩膀上，如果你熟悉[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)，那么你可以更快地上手此项目，vue-clownfish-admin的架构实现正是受到它的启发。

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

## 🐋 项目目录
```
.
|-- public
|   `-- favicon.ico
|-- src
|   |-- assets
|   |   `-- logo.png
|   |-- components // 组件目录，此目录下的所有vue组件都会自动注册全局组件，无需导入
|   |   |-- MenuPanel.vue
|   |   |-- Scrollbar.vue
|   |   |-- SvgIcon.vue
|   |   `-- components.expose.d.ts
|   |-- composables // 存放组合式函数
|   |-- layout // 页面布局
|   |   |-- BreadCrumb.vue
|   |   |-- HeadBar.vue
|   |   |-- SideBar.vue
|   |   |-- TabsBar.vue
|   |   |-- index.vue
|   |   `-- layout.d.ts
|   |-- router // 路由目录
|   |   `-- index.ts
|   |-- stores // pinia状态管理库
|   |   |-- stores.d.ts
|   |   `-- user.ts
|   |-- styles // 全局样式
|   |   |-- _antd.postcss
|   |   |-- _transition.postcss
|   |   |-- _variables.postcss
|   |   `-- index.postcss
|   |-- svgs // svg图标目录，此目录下的所有svg图标名称都可被组件SvgIcon直接引用
|   |   |-- dashboard.svg
|   |   `-- nested.svg
|   |-- utils // 存放工具函数
|   |   `-- index.ts
|   |-- views // 视图目录
|       |-- 404.vue
|       |-- dashboard.vue
|       |-- login.vue
|       |-- redirect.vue
|   |-- App.vue
|   |-- appConfig.ts
|   |-- env.d.ts
|   |-- main.ts
|   `-- permission.ts // 路由权限控制
|-- index.html
|-- package.json
|-- components.d.ts
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts
`-- yarn.lock
|-- LICENSE
|-- README.md
```

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

[在线预览](http://rcui6i1mn.hn-bkt.clouddn.com/index.html)（国内用户访问）

## 🐡 其他
如果遇到项目任何问题欢迎提[issue](https://github.com/1esse/vue-clownfish-admin/issues/new)。

## 🐙 License
[MIT License](https://github.com/1esse/vue-clownfish-admin/blob/master/LICENSE)

Copyright	&copy; 2022-present ZhaoJieXin