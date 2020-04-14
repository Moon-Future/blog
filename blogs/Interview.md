# 面试题集锦

    道理我都懂，却依然过不好这一生
    知识我都会，却依然面不过这一关

## JavaScript

### 1、call 和 apply 的区别是什么，哪个性能更好一些？

#### call、apply、bind的基本介绍
```js
func.call(thisArg, arg1, arg2, ...)
func.apply(thisArg, [argsArray])
func.bind(thisArg, arg1, arg2, ...)
```
>答： call 和 apply 都是 Function 原型上的方法，而每一个函数作为 Function 的一个实例，可以调取原型上的 call 和 apply 方法，call 和 apply 都是用来改变函数执行时 this 的指向，唯一的区别就在于传给函数参数的时候，call 是一个个传参，apply 要求把所有参数以数组的形式传给函数。

## Vue

## HTML

## CSS

## 前端工程化、模块化

## 性能优化

## HTTP