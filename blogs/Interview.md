# 面试题集锦

    道理我都懂，却依然过不好这一生
    知识我都会，却依然面不过这一关

## JavaScript

### 1、call 和 apply 的区别是什么，哪个性能更好一些？

#### 嗯~ o(*￣▽￣*)o：
call 和 apply 都是 Function 原型上的方法，而每一个函数作为 Function 的一个实例，可以调取原型上的 call 和 apply 方法，call 和 apply 都是用来改变函数执行时 this 的指向，唯一的区别就在于传给函数参数的时候，call 是一个个传参，apply 要求把所有参数以数组的形式传给函数。  
call 的性能要比 apply 好那么一些（尤其是传递给函数的参数超过三个的时候），所以后期开发的时候，使用 call 多一点，并且数组参数可以基于 ES6 的展开运算符把数组中的每一项一次传递给函数。

#### call、apply、bind的基本介绍
```js
func.call(thisArg, arg1, arg2, ...)
func.apply(thisArg, [argsArray])
func.bind(thisArg, arg1, arg2, ...)
```
call 和 apply 都能够改变函数执行时的上下文，将一个对象的方法交给另一个对象来执行，并且是立即执行的。  
bind 创建一个新的函数，在调用时设置 this 关键字为提供的值

#### Call vs. Apply vs. Bind Examples

##### Call
```js
var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting) {
    console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
}

say.call(person1, 'Hello'); // Hello Jon Kuperman
say.call(person2, 'Hello'); // Hello Kelly King
```

##### Apply
```js
var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting) {
    console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
}

say.apply(person1, ['Hello']); // Hello Jon Kuperman
say.apply(person2, ['Hello']); // Hello Kelly King
```

##### Bind
```js
var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say() {
    console.log('Hello ' + this.firstName + ' ' + this.lastName);
}

var sayHelloJon = say.bind(person1);
var sayHelloKelly = say.bind(person2);

sayHelloJon(); // Hello Jon Kuperman
sayHelloKelly(); // Hello Kelly King
```

#### 应用

##### 求最值

```js
let arr1 = [3, 5, 8, 13, 7, 21, 1]
Math.max.call(null, ...arr1)
Math.max.apply(null, arr1)
```

##### 数组合并

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]
```

##### 类数组转化为数组

> **类数组：** 可以通过索引属性访问元素并且拥有 length 属性的对象。如 dom 节点，函数参数 arguments

```js
let domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"))
let args = Array.prototype.slice.call(arguments)
```

##### 判断变量类型

```js
function getType(arg) {
    return Object.prototype.toString.call(arg).slice(8, -1)
}
console.log(getType('a'))   // String
console.log(getType(1))     // Number
console.log(getType({}))    // Object
console.log(getType([]))    // Array
console.log(getType(null))  // Null
```

##### 继承

```js
function Animal(name){      
    this.name = name;      
    this.showName = function(){      
        console.log(this.name);      
    }      
}      

function Cat(name){    
    Animal.call(this, name);    
}      

var cat = new Cat("TONY");     
cat.showName();   //TONY
```

### 2、箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成示例，那么箭头函数可以吗？为什么？

#### 嗯~ o(*￣▽￣*)o：
箭头函数与普通函数的区别：
1. 箭头函数语法上比普通函数更简洁
2. 箭头函数没有自己的 this，它里面的 this 是继承函数所处上下文中的 this（使用 call/apply 等任何方式都无法改变 this 的指向）
3. 箭头函数中没有 arguments（类数组），只能基于 ...arg 获取传递的参数集合（数组）
4. 箭头函数不能被 new 执行，因为箭头函数没有 this，也没有 prototype

```js
let fn = (...arg) => { 
    console.log(arg)        // [1, 2, 3]
    console.log(arguments)  // demo.html:14 Uncaught ReferenceError: arguments is not defined
}
fn(1,2,3)
```

### 3、什么是回调函数（Callback） ？

#### 嗯~ o(*￣▽￣*)o：
**简单点说：** 把一个函数 B 作为实参传递给另外一个函数 A，函数 A 在执行的时候，可以把传递进来的函数 B 执行，函数 B 即为回调函数。
**复杂点说：** 在 JavaScript 中，函数是对象。因此，函数可以将函数作为参数，也可以由其他函数返回，执行此操作的函数称为高阶函数，作为参数传递的任何函数都称为回调函数。

>**高阶函数**英文叫 Higher-order function。 那么什么是高阶函数？ JavaScript 的函数其实都指向某个变量。 既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

### 4、什么是懒加载，有什么好处，如何实现？

#### 嗯~ o(*￣▽￣*)o：
1. 懒加载也叫延迟加载，指的是在长网页中延迟加载图像，用户滚动到它们之前，可视区域外的图像不会加载。
2. 好处：
    - 加快页面渲染速度，提升用户体验
    - 只有滚动到某个区域才加载真实的图片，明显减少了服务器的压力和流量，也能够减小浏览器的负担
3. 实现方案：
    - 把所有需要延迟加载的图片用一个盒子包起来，设置宽高和默认占位图
    - 开始让所有的 img 的 src 为空，把真实图片地址放到 img 的自定义属性上，让 img 隐藏
    - 等到所有其它资源都加载完成后，我们再开始加载图片
    - 对于很多图片，需要当页面滚动的时候，当前图片区域完全显示出来后再加载真是图片

#### 预加载
**预加载：** 提前加载图片，当用户需要查看时可直接从本地缓存中渲染。

预加载的核心要点如下：  
- 图片等静态资源在使用之前提前请求；
- 资源后续使用时可以从缓存中加载，提升用户体验
- 页面展示的依赖关系维护（必需的资源加载完才可以展示页面，防止白屏等）

实现预加载主要有三个方法：  
- html 中 img 标签最初设置为 display:none
- js 脚本中使用 image 对象动态创建好图片
- 使用 XMLHttpRequest 对象可以更加精细的控制预加载过程，缺点是无法跨域

目的：  
图片预先加载到浏览器中，访问者便可顺利地在网站上冲浪，并享受到极快的加载速度。这对图片画廊及图片占据很大比例的网站来说十分有利，它保证了图片快速、无缝地发布，也可帮助用户在浏览网站内容时获得更好的用户体验。

### 5、0.1 + 0.2 !== 0.3 Why？

## Vue

## HTML

## CSS

### 1、谈谈你对盒模型的认识

#### 嗯~ o(*￣▽￣*)o
盒模型有两种， W3C 标准盒模型和 IE 盒模型  
1. W3C 标准盒模型包括 margin、border、padding、content，元素的宽度 width = content 的宽度
2. IE 盒模型与 W3C 盒模型的唯一区别就是元素的宽度，元素的宽度 width = border + padding + content

#### 什么是盒模型？
每个元素被表示为一个矩形的盒子，由四部分组成：内容（content）、内边距（padding）、边框（border）、外边距（margin）。它在页面中所占的实际大小（宽高）是 content + padding + border + margin 之和。

![盒模型](http://qiniu.cdn.cl8023.com/interview/box-sizing.png)

```css
box-sizng: content-box; // 浏览器默认，W3C 标准盒子模型，width、height 即内容的宽高，不包含 border、padding
box-sizng: border-box; // IE 盒模型，width、height 包含 content、border、padding
```

#### W3C 标准盒模型
![标准盒模型](http://qiniu.cdn.cl8023.com/interview/content-box.png)
```css
.box {
	box-sizing: content-box;
	width: 200px;
	height: 200px;
	padding: 20px;
	border: 10px solid yellow;
	margin: 5px;
	background: red;
}
/* 
    盒子宽高 260，260
    内容宽高 200，200
    盒子占据空间 270，270（加上 margin）
    盒子的大小 260，260（不包含 margin） 
*/
```

#### IE 盒模型
![IE 盒模型](http://qiniu.cdn.cl8023.com/interview/border-box.png)
```css
.box {
	box-sizing: border-box;
	width: 200px;
	height: 200px;
	padding: 20px;
	border: 10px solid yellow;
	margin: 5px;
	background: red;
}
/* 
    盒子宽高 200，200
    内容宽高 140，140
    盒子占据空间 210，210（加上 margin）
    盒子的大小 200，200（不包含 margin） 
*/
```

### 2、什么是 BFC（Block Formatting Context）？

#### 嗯~ o(*￣▽￣*)o
BFC 称为块级格式化上下文，是 CSS 中的一种渲染机制。是一个拥有独立渲染区域的盒子(也可以理解为结界)，规定了内部元素如何布局，并且盒子内部元素与外部元素互不影响。

如果一个元素具有 BFC，那么无论内部元素如何翻江倒海，它们都不会影响外部元素。因此，BFC 元素不可能有边距重叠，因为边距重叠会影响外部元素。BFC 元素也可以用于清除浮动的影响，因为如果不清除它们，子元素的浮动将导致父元素的高度崩溃，这将不可避免地影响后续元素的布局和位置，这很明显与 BFC 元素的子元素不会影响外部元素设置的事实相反。

#### 如何触发 BFC？
只要元素满足下面任一条件即可触发 BFC 特性：
- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

#### BFC 有什么用？


## 前端工程化、模块化

## 性能优化

## HTTP