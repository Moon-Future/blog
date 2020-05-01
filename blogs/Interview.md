# 面试题集锦

    道理我都懂，却依然过不好这一生
    知识我都会，却依然面不过这一关

## JavaScript

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


### 6、说说你对 Event Loop 的理解
### 7、谈谈你对原型链的理解
### 8、如何实现继承？

## Vue

## HTML

## CSS

### 1、谈谈你对盒模型的认识

盒模型有两种， W3C 标准盒模型和 IE 盒模型  
1. W3C 标准盒模型包括 margin、border、padding、content，元素的宽度 width = content 的宽度
2. IE 盒模型与 W3C 盒模型的唯一区别就是元素的宽度，元素的宽度 width = border + padding + content

---

**1. 什么是盒模型？**  
每个元素被表示为一个矩形的盒子，由四部分组成：内容（content）、内边距（padding）、边框（border）、外边距（margin）。它在页面中所占的实际大小（宽高）是 content + padding + border + margin 之和。

![盒模型](http://qiniu.cdn.cl8023.com/interview/box-sizing.png)

```css
box-sizng: content-box; // 浏览器默认，W3C 标准盒子模型，width、height 即内容的宽高，不包含 border、padding
box-sizng: border-box; // IE 盒模型，width、height 包含 content、border、padding
```

**2. W3C 标准盒模型**  
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

**3. IE 盒模型**  
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

BFC 称为块级格式化上下文，是 CSS 中的一种渲染机制。是一个拥有独立渲染区域的盒子(也可以理解为结界)，规定了内部元素如何布局，并且盒子内部元素与外部元素互不影响。

如果一个元素具有 BFC，那么无论内部元素如何翻江倒海，它们都不会影响外部元素。因此，BFC 元素不可能有边距重叠，因为边距重叠会影响外部元素。BFC 元素也可以用于清除浮动的影响，因为如果不清除它们，子元素的浮动将导致父元素的高度崩溃，这将不可避免地影响后续元素的布局和位置，这很明显与 BFC 元素的子元素不会影响外部元素设置的事实相反。

---

**1. 如何触发 BFC？** 
只要元素满足下面任一条件即可触发 BFC 特性：
- body 根元素 (html)
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

**2. BFC 布局规则** 
1. 内部的块级元素会在垂直方向，一个接一个地放置。
2. Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
3. 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC 的区域不会与 float box 重叠。
5. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算 BFC 的高度时，浮动元素也参与计算

**3. BFC 有什么用？**  
1. 防止垂直 margin 重叠
2. 自适应两栏布局
3. 清除内部浮动

[什么是 BFC](https://cl8023.com/#/article/5e9c20b04b58772fdbd49681)

## 前端工程化、模块化

## 性能优化

## HTTP

### 1、什么是 HTTP 协议？有什么特点？

HTTP 协议是超文本传输协议的缩写，英文是 Hyper Text Transfer Protocol。它是从 WEB 服务器传输超文本标记语言（HTML）到本地浏览器的传送协议。

特点：
- **简单快速**：客户向服务器请求服务时，只需传送请求方法和路径
- **灵活**：HTTP 允许传输任意类型的数据对象。传输的类型由 Content-Type 加以标记
- **无连接**：限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间，但是却不利于客户端与服务器保持会话连接，为了弥补这种不足，产生了两项记录 HTTP 状态的技术，一个叫做 Cookie，一个叫做 Session。
- **无状态**：是指协议对于事务处理没有记忆能力，服务器不知道客户端是什么状态，每次 HTTP 请求都是独立的，任何两个请求之间没有什么必然的联系。

### 2、简单描述下 HTTP 连接建立流程

1. 客户端和服务器端通过 TCP 三次握手建立双方连接；
2. 客户端通过发送请求报文及请求数据给服务器端；
3. 服务器端返回响应报文及响应数据给客户端；
4. 客户端和服务器端通过 TCP 四次挥手断开连接。

### 3、说说 TCP 三次握手过程

1. **第一次握手**：建立连接时，客户端发送 SYN 包（seq=x）到服务器，并进入 SYN_SENT 状态， 等待服务器确认。（SYN：同步序列编号，Synchronize Sequence Numbers）；
2. **第二次握手**：服务器收到 SYN 包，必须确认客户的 SYN（ack=x+1），同时自己也发送一个 SYN 包（seq=y），即 SYN + ACK 包，此时服务器进入 SYN_RECEVED 状态；
3. **第三次握手**：客户端收到服务器的 SYN + ACK 包，向服务器发送确认包 ACK（ack=y+1），此包发送完毕，客户端和服务器端进入 ESTABLISHED（TCP 连接成功）状态，完成三次握手。

---

**TCP 3-Way Handshake (SYN, SYN-ACK,ACK)**，TCP 三次握手流程图

![tcp-3-way-handshake](http://qiniu.cdn.cl8023.com/HTTP/tcp-3-way-handshake.jpg)

**TCP Header**  

![TCP-Header-Format](http://qiniu.cdn.cl8023.com/HTTP/TCP-Header-Format.png)

TCP 有6中标志位：
- SYN（synchronous 建立连接）
- ACK（acknowledgement 确认）
- PSH（push 传送）
- FIN（finish 结束）
- RST（reset 重置）
- URG（urgent 紧急）

另外数据包：
- Sequence number（顺序号码）
- Acknowledge number（确认号码）

1. 第一次握手中 **SYN = 1**，代表客户端 Client 要建立连接，同时随机产生 **seq（Sequence number）= x** 的数据包，然后传输到 Server；
2. Server 收到 Client 的信息，通过 *SYN = 1* 知道是要建立连接，然后向 Client 发送信息，**ACK = 1** 代表确认，**ack（Acknowledge number）= x + 1**，**SYN = 1** 代表建立连接，随机产生 **seq = y** 的数据包；
3. Clien 收到 Server 的信息，通过 *SYN = 1* 知道是要建立连接，然后检查 ack 是否正确，即第一次发送的 seq + 1，同时检查 ACK 是否为 1，若正确，Client 再发送 **ack = y + 1**，**ACK = 1** 到 Server，Server 收到确认 seq 值和 ACK = 1 后则连接建立成功。

### 4、为什么 TCP 连接要进行三次握手而不是两次握手？

防止服务器端的一直等待而浪费资源。

> 理解：假设 client 发出的第一个连接请求报文段并没有丢失，而是在某个网络结点长时间的滞留了，以致延误到连接释放以后的某个时间才到达 server。本来这是一个早已失效的报文段。但 server 收到此失效的连接请求报文段后，就误认为是 client 再次发出的一个新的连接请求。于是就向 client 发出确认报文段，同意建立连接。假设不采用“三次握手”，那么只要 server 发出确认，新的连接就建立了。由于现在 client 并没有发出建立连接的请求，因此不会理睬 server 的确认，也不会向 server 发送数据。但 server 却以为新的传输连接已经建立，并一直等待 client 发来数据。这样，server 的很多资源就白白浪费掉了。采用“三次握手”的办法可以防止上述现象发生。例如刚才那种情况，client 不会向 server 的确认发出确认。server 由于收不到确认，就知道 client 并没有要求建立连接。”

> 为了保证服务端能收接受到客户端的信息并能做出正确的应答而进行前两次（第一次和第二次）握手，为了保证客户端能够接收到服务端的信息并能做出正确的应答而进行后两次（第二次和第三次）握手。



### 5、TCP 四次挥手过程，为什么要四次挥手？



### 6、浏览器在与服务器建立了一个 TCP 连接后是否会在一个 HTTP 请求完成后断开？什么情况下会断开？

Request Header 中 Connection 属性决定了连接是否持久，HTTP/1.0 中 Connection 默认是 close 的，即每次请求都会重新建立和断开 TCP 连接，而在 HTTP/1.1 中 Connection 默认是 keep-alive 的，即连接可以复用，不用每次都重新建立和断开 TCP 连接。如果想主动断开连接，只需要将 Connection 属性设置为 close 即可，即 Connection: close。一般情况下复用的 TCP 连接在等待设置的超时时间之后还没有被任何连接使用的话，TCP 连接就会主动断开。

### 7、一个 TCP 连接能发几个 HTTP 请求？

- HTTP/1.0 中 Connection 默认是 close 的，即每次请求都会重新建立和断开 TCP 连接，因此一个 TCP 连接只能发1个 HTTP 请求
- HTTP/1.1 中 Connection 默认是 keep-alive 的，即连接可以复用，不用每次都重新建立和断开 TCP 连接，因此只要 TCP 连接不断开，便可以一直发送 HTTP 请求，持续不断，没有上限
- HTTP 2.0 支持多路复用，一个 TCP 连接是可以并发多个 HTTP 请求，同样也是支持长连接，因此只要不断开 TCP 的连接，HTTP 请求数也是可以没有上限地持续发送

### 8、一个 TCP 连接中 HTTP 请求发送可以一起发送么（比如一起发三个请求，再三个响应一起接收）？

- HTTP/1.0 一个 TCP 连接只能发1个 HTTP 请求，因此不可以
- HTTP/1.1 在同一时刻只能处理一个请求，即两个请求的生命周期不能重叠，任意两个 HTTP 请求从开始到结束的时间在同一个 TCP 连接里不能重叠，收到请求的服务器必须按照请求收到的顺序发送响应。**通过 Pipelining 技术可以实现一个 TCP 连接发送多个 HTTP 请求，但是由于浏览器默认关闭，因此可以认为这是不可行的**
- HTTP/2.0 提供了 Multiplexing 多路传输特性，可以在一个 TCP 连接中同时完成多个 HTTP 请求

> 在 HTTP/1.1 存在 Pipelining 技术可以完成这个多个请求同时发送，但是由于浏览器默认关闭，所以可以认为这是不可行的

> HTTP pipelining is a technique in which multiple HTTP requests are sent on a single TCP (transmission control protocol) connection without waiting for the corresponding responses.  
> The technique was superseded by multiplexing via HTTP/2, which is supported by most modern browsers.  
> As of 2018, HTTP pipelining is not enabled by default in modern browsers, due to several issues including buggy proxy servers and HOL blocking.

在 HTTP/1.1 时代，浏览器提高页面加载效率主要通过下面两点：  
- 维持和服务器已经建立的 TCP 连接，在同一连接上顺序处理多个请求。
- 和服务器建立多个 TCP 连接。

### 9、浏览器对同一 Host 建立 TCP 连接到数量有没有限制？

有，Chrome 最多允许对同一个 Host 建立六个 TPC 连接，不用的浏览器有一些不同。

### 10、TCP 与 UDP 有什么区别？

1. 连接与无连接
 - TCP 是基于连接的传输方式，发送数据之前需要先建立连接；
 - UDP 发送数据之前不需要建立连接。
2. 正确性与丢包
 - TCP 传送数据可靠，无差错，不丢失，不重复，且按序到达；
 - UDP 不保证传送数据可靠，尽最大努力交付。
3. 流模式与数据报模式
 - TCP 面向字节流，TC P把数据看成一连串无结构的字节流；
 - UDP 面向报文，没有拥塞控制，因此网络出现拥塞不会使源主机的发送速率降低（对实时应用很有用，如 IP 电话，实时视频会议等）。
4. 点到点及多点互联
 - 每一条 TCP 连接只能是点到点的；
 - UDP 支持一对一，一对多，多对一和多对多的交互通信。
5. 资源要求多和少
 - TCP 首部开销20字节；
 - UDP 的首部开销小，只有8个字节。
6. 信道可靠和不可靠
 - TCP 的逻辑通信信道是全双工的可靠信道；
 - UDP 则是不可靠信道。

> UDP（User Datagram Protocol，用户数据包协议），是一个简单的面向数据报的通信协议，UDP 只提供数据的不可靠传递，它一旦把应用程序发给网络层的数据发送出去，就不保留数据备份

### 参考连接
- [你猜一个 TCP 连接上面能发多少个 HTTP 请求](https://zhuanlan.zhihu.com/p/61423830?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
- [HTTP pipelining](https://en.wikipedia.org/wiki/HTTP_pipelining)

---

1.tcp三次握手的原理和过程，tcp与udp有什么区别

2.http和https有什么区别，加密方式是什么，传输原理是什么

3.防抖和节流有什么用，一般的使用场景，原理是什么

4.手写判断一个字符串是不是回文字符串，如果能使用js中的方法，你会使用哪一个方法

5.跨域是什么？怎么解决跨域？

6.状态码都有哪些？304是指什么意思

7.浏览器的缓存机制是什么，怎么实现缓存，怎么想让特定文件进行缓存

8.函数和对象的区别是什么

9.redux是什么，为什么要使用redux，工作原理是什么

10.js中的事件循环是什么原理