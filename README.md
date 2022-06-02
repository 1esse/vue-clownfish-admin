<h1>vue-clownfish-admin<h3 align="center">Typescript + Vue3技术栈后台前端解决方案</h3></h1>
<p align="center">
  <a href="https://github.com/vuejs/core">
    <img src="https://img.shields.io/badge/vue-3.2.33-brightgreen.svg" alt="vue">
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


## 简介
[vue-clownfish-admin](https://github.com/1esse/vue-clownfish-admin) 是一个由前端最新技术栈开发的后台管理前端解决方案。基于vue3，集成vue3最新生态系统的核心库实现。主要的技术栈有
[ES2015+](http://es6.ruanyifeng.com/)，[typescript](https://www.typescriptlang.org/zh/)，[vue3](https://staging-cn.vuejs.org)，[pinia](https://pinia.vuejs.org/)，[vue-router](https://router.vuejs.org/zh/)，[vite](https://cn.vitejs.dev/)，[antd](https://antdv.com/)，[postcss-nesting](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting#readme)，了解并学习这些技术知识会让你更容易入手此项目。此项目基于`vite`构建，并使用`vue3`作为开发技术，所以[只针对现代浏览器做开发](https://cn.vitejs.dev/guide/build.html#browser-compatibility)，不支持低版本的浏览器（如ie），如有需要请自行添加`polyfill`进行适配。
+ [在线预览](https://1esse.github.io/vue-clownfish-admin)
+ [在线预览](http://rcui6i1mn.hn-bkt.clouddn.com/index.html)（国内用户访问）

此项目为纯净项目，没有集成任何无关此项目的功能代码，仅有的少许你可能用不到的代码仅作此项目的功能示例供学习使用。值得注意的是，伴随此项目的“布局组件”（src/layout/*.vue）基本不耦合，聚能分工合作，散能一刀两断，大家都能好聚好散。不必担心删除布局组件后出现的连锁反应，这也为直接上手开发项目提供了极大的方便。
## 主要功能
+ 根据路由配置自动生成侧边栏菜单（支持多层嵌套和外链）
+ 根据当前路由信息动态生成面包屑
+ 导航标签页（右键弹出菜单，支持页面刷新，关闭）
+ 侧边栏菜单、面包屑、标签页都支持icon图标(antd图标和svg)
+ 根据路由配置动态缓存页面
+ Svg Sprite 图标
+ 自动注册全局组件（antd组件及components/*.vue）
+ 支持原生CSS变量和CSSWG草案规定进行开发（postcss-nesting）
+ 自动为css代码添加前缀，使样式适配不同浏览器

## 开发准备
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

## scripts命令
+ dev：本地开发预览
+ build：打包项目代码
+ preview：预览打包后的项目

## 预览项目
[在线预览](https://1esse.github.io/vue-clownfish-admin)

[在线预览](http://rcui6i1mn.hn-bkt.clouddn.com/index.html)（国内用户访问）

## 其他
如果遇到项目任何问题欢迎提[issue](https://github.com/1esse/vue-clownfish-admin/issues/new)。

## License
[MIT License](https://github.com/1esse/vue-clownfish-admin/blob/master/LICENSE)

Copyright	&copy; 2022-present ZhaoJieXin