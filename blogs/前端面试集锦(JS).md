---
title: 前端面试集锦（JS）
date: 2019-04-12 17:00:00
tags: [面试, Javascript]
---

# 一、DOM事件
## 1、基本概念：DOM事件的级别
```js
// DOM0
element.onclick = function() {}
// DOM1 没有涉及跟实践有关的东西
// DOM2 IE：attachEvent
element.addEventListener('click', function() {}, false)
// DOM3 事件类型增加，如鼠标事件，键盘事件等等
element.addEventListener('keyup', function() {}, false)
```

## 2、DOM模型
- 捕获
- 冒泡

## 3、DOM事件流
捕获 ---> 目标阶段 ---> 冒泡

## 4、描述DOM事件捕获的具体流程
捕获：window ---> document ---> html ---> body ---> ... ---> 目标元素  
冒泡：目标元素 ---> ... ---> body ---> html ---> document ---> window

## 5、Event对象的常见应用
```js
event.preventDefault()
event.stopPropagation()
event.stopImmediatePropagation()
event.currentTarget()
event.target()
```

## 6、自定义事件
```js
var eve = new Event('test');
window.addEventListener('test', function() {}, false)
window.dispatchEvent(eve);
```

# 二、原型链类
## 1、创建对象的几种方法
```js
// 第一种方式：字面量
var o1 = {name: 'o1'}; // 默认原型链指向Object， 类似 var o1 = new Object({name: 'o1'});
// 第二种方式：通过构造函数
var M = function(name) {this.name = name};
var o2 = new M('o2');
// 第三种方式：Object.create
var p = {name: 'o3'};
var o3 = Object.create(p); // p 为新创建对象的原型对象
```

## 2、原型、构造函数、实例、原型链

## 3、instanceof 的原理

## 4、new 运算符
- 1、一个新对象被创建，它继承自foo.prototype
- 2、构造函数 foo 被执行，执行的时候，响应的传参会被传入，同时上下文（this）会被指定为这个新实例。new foo 等同于 new foo()，只能用在不传递任何参数的情况
- 3、如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果，如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象

# 三、面向对象
## 1、类与实例：类的声明，生成实例
```js
// 类的声明
function Animal() {
  this.name = 'name'
}

// ES6中的class声明
class Animal {
  constructor() {
    this.name = 'name'
  }
}

// 实例化
new Animal();
```

## 2、类与继承：如何实现继承，继承的几种方式
- 借助构造函数实现继承
  ```js
  function Parent() {
    this.name = 'parent';
  }
  function Child() {
    Parent.call(this);
    this.type = 'child';
  }
  // 缺点：Parent的原型链未被继承
  ```
- 借助原型链继承
  ```js
  function Parent() {
    this.name = 'parent';
  }
  function Child() {
    this.type = 'child';
  }
  Child.prototype = new Parent();
  // 缺点：对原型中引用类型值的误修改
  ```
- 组合方式
  ```js
  function Parent() {
    this.name = 'parent';
  }
  function Child() {
    Parent.call(this);  // 1
    this.type = 'child';
  }
  Child.prototype = new Parent(); // 2
  // 父级构造函数执行两次
  ```
- 组合继承的优化1
  ```js
  function Parent() {
    this.name = 'parent';
  }
  function Child() {
    Parent.call(this);
    this.type = 'child';
  }
  Child.prototype = Parent.prototype;
  ```
- 组合继承的优化2
  ```js
  function Parent() {
    this.name = 'parent';
  }
  function Child() {
    Parent.call(this);
    this.type = 'child';
  }
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
  ```