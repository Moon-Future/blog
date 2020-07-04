### 1、call 和 apply 的区别是什么，哪个性能更好一些？

call 和 apply 都是 Function 原型上的方法，而每一个函数作为 Function 的一个实例，可以调取原型上的 call 和 apply 方法，call 和 apply 都是用来改变函数执行时 this 的指向，唯一的区别就在于传给函数参数的时候，call 是一个个传参，apply 要求把所有参数以数组的形式传给函数。  
call 的性能要比 apply 好那么一些（尤其是传递给函数的参数超过三个的时候），所以后期开发的时候，使用 call 多一点，并且数组参数可以基于 ES6 的展开运算符把数组中的每一项一次传递给函数。

---

**1. call、apply、bind的基本介绍**  
```js
func.call(thisArg, arg1, arg2, ...)
func.apply(thisArg, [argsArray])
func.bind(thisArg, arg1, arg2, ...)
```
call 和 apply 都能够改变函数执行时的上下文，将一个对象的方法交给另一个对象来执行，并且是立即执行的。  
bind 创建一个新的函数，在调用时设置 this 关键字为提供的值

**2. Call vs. Apply vs. Bind Examples**  
Call
```js
var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting) {
    console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
}

say.call(person1, 'Hello'); // Hello Jon Kuperman
say.call(person2, 'Hello'); // Hello Kelly King
```

Apply
```js
var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting) {
    console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
}

say.apply(person1, ['Hello']); // Hello Jon Kuperman
say.apply(person2, ['Hello']); // Hello Kelly King
```

Bind
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

**3. 应用**  

- 求最值

```js
let arr1 = [3, 5, 8, 13, 7, 21, 1]
Math.max.call(null, ...arr1)
Math.max.apply(null, arr1)
```

- 数组合并

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]
```

- 类数组转化为数组

> **类数组：** 可以通过索引属性访问元素并且拥有 length 属性的对象。如 dom 节点，函数参数 arguments

```js
let domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"))
let args = Array.prototype.slice.call(arguments)
```

- 判断变量类型

```js
function type(arg) {
    return Object.prototype.toString.call(arg).slice(8, -1)
}
console.log(type('a'))   // String
console.log(type(1))     // Number
console.log(type({}))    // Object
console.log(type([]))    // Array
console.log(type(null))  // Null
```

- 继承

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

**简单点说：** 把一个函数 B 作为实参传递给另外一个函数 A，函数 A 在执行的时候，可以把传递进来的函数 B 执行，函数 B 即为回调函数。
**复杂点说：** 在 JavaScript 中，函数是对象。因此，函数可以将函数作为参数，也可以由其他函数返回，执行此操作的函数称为高阶函数，作为参数传递的任何函数都称为回调函数。

>**高阶函数**英文叫 Higher-order function。 那么什么是高阶函数？ JavaScript 的函数其实都指向某个变量。 既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

### 4、什么是懒加载，有什么好处，如何实现？

1. 懒加载也叫延迟加载，指的是在长网页中延迟加载图像，用户滚动到它们之前，可视区域外的图像不会加载。
2. 好处：
    - 加快页面渲染速度，提升用户体验
    - 只有滚动到某个区域才加载真实的图片，明显减少了服务器的压力和流量，也能够减小浏览器的负担
3. 实现方案：
    - 把所有需要延迟加载的图片用一个盒子包起来，设置宽高和默认占位图
    - 开始让所有的 img 的 src 为空，把真实图片地址放到 img 的自定义属性上，让 img 隐藏
    - 等到所有其它资源都加载完成后，我们再开始加载图片
    - 对于很多图片，需要当页面滚动的时候，当前图片区域完全显示出来后再加载真是图片

---

**预加载**  
提前加载图片，当用户需要查看时可直接从本地缓存中渲染。

预加载的核心要点如下：  
- 图片等静态资源在使用之前提前请求；
- 资源后续使用时可以从缓存中加载，提升用户体验
- 页面展示的依赖关系维护（必需的资源加载完才可以展示页面，防止白屏等）

实现预加载主要有三个方法：  
- html 中 img 标签最初设置为 display: none
- js 脚本中使用 image 对象动态创建好图片
- 使用 XMLHttpRequest 对象可以更加精细的控制预加载过程，缺点是无法跨域

目的：  
图片预先加载到浏览器中，访问者便可顺利地在网站上冲浪，并享受到极快的加载速度。这对图片画廊及图片占据很大比例的网站来说十分有利，它保证了图片快速、无缝地发布，也可帮助用户在浏览网站内容时获得更好的用户体验。

### 5、0.1 + 0.2 !== 0.3 Why？

- 计算机内部的信息都是由二进制方式表示的
- 某些浮点数没办法用二进制准确的表示出来，可能会出现无限循环的情况
- 0.1 和 0.2 转换成二进制后会无限循环，在 JavaScript 中遵循 IEEE 754 标准，通过 64 位来表示一个数字，因此会将转换后多余的位数截掉，精度已损失

[JavaScript 深入之浮点数精度](https://github.com/mqyqingfeng/Blog/issues/155)


### 6、说说什么是 Promise？

Promise 是异步编程的一种解决方案，比传统的解决方案【回调函数】和【事件】更合理和更强大，从语法上说 Promise 是一个对象，从它可以获取异步操作的结果。

Promise 对象有以下两个特点：
- 对象的状态不受外界影响
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果

#### Promise 总结

1. Promise 的状态一经改变就不能再改变。
2. .then 和 .catch 都会返回一个新的 Promise。
3. catch 不管被连接到哪里，都能捕获上层未捕捉过的错误。
4. 在 Promise 中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如 return 2 会被包装为 return Promise.resolve(2)。
5. Promise 的 .then 或者 .catch 可以被调用多次, 但如果 Promise 内部的状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 的时候都会直接拿到该值。
6. .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。
7. .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
8. .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。
9. .then 方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为 catch是 .then 第二个参数的简便写法。

#### Promise.finally()

1. .finally 方法也是返回一个 Promise，他在 Promise 结束的时候，无论结果为 resolved 还是 rejected，都会执行里面的回调函数。
2. .finally() 方法不管 Promise 对象最后的状态如何都会执行
3. .finally() 方法的回调函数不接受任何的参数，也就是说在 .finally() 函数中是没法知道 Promise 最终的状态是 resolved 还是 rejected 的

#### Promise.all() 和 Promise.rece() 

1. Promise.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
2. Promise.race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
3. Promise.all().then() 结果中数组的顺序和 Promise.all() 接收到的数组顺序一致。
4. all 和 race 传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被 then 的第二个参数或者后面的 catch 捕获，但并不会影响数组中其它的异步任务的执行。

#### Promise 可以取消吗？Axios 呢？

### 7、typeof 和 instanceof 的区别

- typeof 表示对某个变量类型的检测，基本数据类型除了 null 外都能正常的显示为对于的类型，引用类型除了函数会显示 'function'，其他都显示为 'object'
- instanceof 主要是用于某个构造函数的原型对象是否在某个对象的原型链上

#### 为什么 typeof null === "objcet"

这是 JavaScript 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 的系统，为了性能考虑使用低位存储变量的数据类型信息，000 开头的代表是对象，而 null 表示全零，所以将它错误的判断成 object。

#### instanceof 实现

```js
function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left)
    while(true) {
        if (proto === null) return false
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}
```


### 8、介绍一下模块化发展历程

模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。

- **IIFE**（Immediately Invoked Function Expression，立即执行函数表达式）：使用自执行函数来编写模块化，特点：**在一个单独的函数作用域中执行代码，避免变量冲突**。
    ```js
    (function(){
        return {
            data:[]
        }
    })()
    ```
- **AMD**（Asynchronous Module Definition，异步模块定义）： 使用 requireJS 来编写模块化，特点：**依赖必须提前声明好**。
    ```js
    define('./index.js', function(code){
        // code 就是 index.js 返回的内容
    })
    ```
- **CMD**（Common Module Definition，通用模块定义）：使用 seaJS 来编写模块化，特点：**支持动态引入依赖文件**。
    ```js
    define(function(require, exports, module) {  
        var indexCode = require('./index.js');
    });
    ```
- **CommonJS**（同步加载模块）： nodejs 中自带的模块化。
    ```js
    var fs = require('fs');
    ```
- **ES Modules**：ES6 引入的模块化，支持 import 来引入另一个 js。
    ```js
    import a from 'a';
    ```

#### CommonJS 和 ES6 Modules 有什么区别？
- CommonJS 模块是运行时加载；ES6 Modules 是编译时输入接口
- CommonJS 输出的是值的拷贝；ES6 Modules 输出的是值的引用，被输出模块的内部的改变会影响引用的改变
- CommonJS 导入的模块路径可以是一个表达式，因为它使用的是 require() 方法；而 ES6 Modules 只能是字符串
- CommonJS this 指向当前模块；ES6 Modules this 指向 undefined
- ES6 Modules 中没有这些顶层变量：arguments、require、module、exports、__filename、__dirname


## 参考链接

[霖呆呆的近期面试128题汇总](https://juejin.im/post/5eb55ceb6fb9a0436748297d?utm_source=gold_browser_extension#heading-2)
[要就来45道Promise面试题一次爽到底](https://juejin.im/post/5e58c618e51d4526ed66b5cf#heading-16)