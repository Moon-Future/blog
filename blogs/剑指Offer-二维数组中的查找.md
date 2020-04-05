### 题目

在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

**示例：**   
现有矩阵 matrix 如下：

    [
        [1,   4,  7, 11, 15],
        [2,   5,  8, 12, 19],
        [3,   6,  9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]
    ]

给定 target = 5，返回 true。
给定 target = 20，返回 false。


**限制：**  
0 <= n <= 1000  
0 <= m <= 1000

### 思路

> 若使用暴力法遍历矩阵 matrix ，则时间复杂度为 O(N*M)O(N∗M) 。暴力法未利用矩阵 “从上到下递增、从左到右递增” 的特点，显然不是最优解法。

1. 从矩阵 matrix 第一个元素（索引设为 (i, j) ）开始遍历，并与目标值对比：  
当 matrix[i][j] > target 时： 列索引向左移动一格（即 j--），即消去矩阵第 j 列元素；  
当 matrix[i][j] < target 时： 行索引向下移动一格（即 i++），即消去矩阵第 i 行元素；  
当 matrix[i][j] == target 时： 返回 true 。  
2. 若行索引或列索引越界，则代表矩阵中无目标值，返回 false 。


### 代码

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    let rows = matrix.length
    if (!rows) {
        return false
    }
    let cols = matrix[0].length
    if (!cols) {
        return false
    }
    rows = 0
    cols = cols - 1
    while(rows < matrix.length && cols >= 0) {
        if (matrix[rows][cols] === target) {
            return true
        } else if (matrix[rows][cols] > target) {
            --cols
        } else {
            ++rows
        }
    }
    return false
};
```