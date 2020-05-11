## 1、说说什么是 MVC 和 MVVM

1. MVC 即 Model-View-Controller，分别表示数据层，视图层，控制层。
  - Model：数据模型，用来存储数据
  - View：视图界面，用来展示 UI 界面和响应用户交互
  - Controller：控制器，监听数据模型的改变和控制视图行为、处理用户交互

2. MVVM 即 Model-View-ViewModel 模式，ViewModel 与 View 实现了双向绑定：
  - ViewModel 改变时，自动更新 View
  - View 改变时，自动更新 ViewModel


## 2、Vue的优点及缺点

Vue 最核心的两个特点：**响应式**和**组件化**

- 响应式：这也是 vue.js 最大的有点，通过 MVVM 思想实现数据双向绑定，通过虚拟 BOM（不是 vue 独有） 让开发者可以用数据来操作 BOM，而不必去操作真实的 BOM，提升了性能，且让开发者有更多的时间去思考业务逻辑。
- 组件化：把一个页面中的各个模块拆分到一个个组件当中，或者把一些公共的部分抽你出来做成一个可复用的组件。组件化带来的好处就是，提高了开发效率方便重复使用，使项目的可维护性更高。

缺点：
- 不利于 SEO;
- 初次加载页面耗时多。


## 3、Vue 中 hash 模式和 history 模式的区别

- hash 模式和 history 模式最直观的区别就是在 URL 中，hash 带了一个很丑的 #， 而 history 是没有 # 的
- hash 模式下，URL 中仅 hash 符号之前的内容会被包含在请求中，如 www.abc.com，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。
- history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 www.abc.com/book/id。如果后端缺少对 /book/id 的路由处理，将返回 404 错误。所以，要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是 app 依赖的页面。
- hash 模式是依靠 onhashchange 事件（监听 location.hash 的改变），而 history 模式是主要是依靠的 HTML5 history 中新增的两个方法，pushState() 可以改变 URL 地址且不会发送请求，replaceState() 可以读取历史记录栈，还可以对浏览器记录进行修改。

## 4、什么是虚拟 BOM？

- 虚拟 BOM 本质就是用一个原生的 JavaScript 对象去描述一个 DOM 节点，是对真实 BOM 的一层抽象。
- 由于在浏览器中频繁操作 BOM 是很消耗性能的，因此需要一层抽象，在 patch 过程（将新旧 vnode 进行比较，创建、删除或者更新 DOM 节点/组件实例）中尽可能的一次性将差异更新到 BOM 中，这样保证了 DOM 不会出现性能很差的问题。
- 另外还有很重要的一点，也是它的设计初衷，为了更好的跨平台，比如 Node.js 就没有 DOM，如果想实现 SSR（服务端渲染），那么一个方式就是借助 Virtual DOM，因为 Virtual DOM 本身是 JavaScript 对象。