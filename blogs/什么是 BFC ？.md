## 什么是 BFC ？
BFC，全名是 Block Formatting Context，称为块级格式化上下文，是 CSS 中的一种渲染机制。是一个拥有独立渲染区域的盒子(也可以理解为结界)，规定了内部元素如何布局，并且盒子内部元素与外部元素互不影响。

这么多文字看起来可能有些抽象，现在用一个 js 函数来描述它，我们声明一个名为 bfc 的函数，因为函数作用域的原因，其中所有变量都在此声明并运行，不会影响函数外的变量。
```js
var box = 1;
function bfc() {
    var box = "2";
    console.log(box);
}
bfc(); //2
console.log(box) //1
```
那么，我们可以这样理解：所谓的 BFC 是 css 的一个作用域？

## BFC 的产生
由于 js 可以用过函数和其它方法实现块级作用域，css 也可以通过某种方式实现 BFC。  
BFC 官方文档有这样一段话：
>Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

从该描述中可以看到，以下方法可以创建新的块级执行上下文（BFC）：
- body 根元素 (html)
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)


## BFC 布局规则
**1. 内部的块级元素会在垂直方向，一个接一个地放置。**
正如每个块级元素在 body 根元素下都是占据一行，一个一个垂直方向排列。

**2. Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠**
```html
<style type="text/css">
  .top {
    width:100px;
    height:100px;
    background:blue;
    margin-bottom: 30px;
  }
  .bottom {
    width:100px;
    height:100px;
    background:red;
    margin-top: 20px;
  }
</style>
<body>
  <div class="top"></div>
  <div class="bottom"></div>
</body>
```

因为两个相邻 Box 元素 .top、.bottom 在同一个 body 下面，所以 .top 的下边距和 .bottom 的上边距重叠，重叠后的边距值为：
- 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值
- 两个相邻的外边距都是负数时，折叠结果是它们两者之间较小的值
- 两个外边距一正一负时，折叠结果是两者的相加的和

![边距重叠](http://qiniu.cdn.cl8023.com/BFC/BFC-1.jpg)



**3. 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。**
**4. BFC 的区域不会与 float box 重叠。**
**5. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。**
**6. 计算 BFC 的高度时，浮动元素也参与计算**