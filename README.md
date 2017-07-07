# min-dva

[![npm](https://img.shields.io/npm/v/min-dva.svg)](https://www.npmjs.com/package/min-dva)
[![NPM downloads](http://img.shields.io/npm/dm/min-dva.svg?style=flat)](https://npmjs.org/package/min-dva)

#### 基于React、[dva](https://github.com/dvajs/dva)、[antd](https://github.com/ant-design/ant-design)的便捷式开发Demo

---
 
 ## 特性
 
 * **化繁为简** ：封装对antd比较复杂的组件进行了二次封装，如MForm，MEditTable等。
 * **后台模板** ：参考[antd-admin](https://github.com/zuiidea/antd-admin)编写出具有通用性的后台模板，只需要配置一下`menu.js`和`config.js`里面的参数，即可得到你想要的后台框架
 * **优化model** ：在[dva](https://github.com/dvajs/dva)的`model`基础上，我们新增了`model`的继承方法，并给model默认添加了许多很有用的方法，详情请查看[model]()相关的文档。
 * **Mock数据** ： [roadhog](https://github.com/sorrycc/roadhog)提供了Mock功能，我们可以脱离后台，自己编写自己的模拟数据接口
 * **中后台通用的应用场景** ： 我们的Demo提供了适合展示型的模板
 
 * [x] 台账式模板
 * [x] 带编辑功能的台账式模板 
 * [ ] 左树右表模板
 
 ## 基础
 因为本Demo基于[dva](https://github.com/dvajs/dva)，所以很有必要先学习dva的知识
 * 理解 dva 的 [8 个概念](https://github.com/dvajs/dva/blob/master/docs/Concepts_zh-CN.md) ，以及他们是如何串起来的
 * 掌握 dva 的[所有 API](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md)
 * 查看 [dva 知识地图](https://github.com/dvajs/dva-knowledgemap) ，包含 ES6, React, dva 等所有基础知识
 * 了解[roadhog](https://github.com/sorrycc/roadhog)脚手架
 
 ## 快速上手
 - [30分钟学会编写`台账式模板`]()
 - [60分钟学会编写`编辑表格模板`]()
 
 ## License
 [MIT](https://tldrlegal.com/license/mit-license)
