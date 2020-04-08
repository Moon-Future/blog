### 题目【中等】

输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)  
B是A的子结构， 即 A中有出现和B相同的结构和节点值。

例如:  
给定的树 A:

         3
        / \
       4   5
      / \
     1   2
给定的树 B：

       4 
      /
     1
返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。

---

示例 1：

    输入：A = [1,2,3], B = [3,1]
    输出：false

示例 2：

    输入：A = [3,4,5,1,2], B = [4,1]
    输出：true

---

限制：  
0 <= 节点个数 <= 10000

### 思路
1. 母树A，子树B
2. 递归或迭代遍历A所有节点a，当a节点等于B根节点值时，判断a的子树是否等于B的子树
3. 当B为null时，说明树B已匹配完成，返回true
4. 当A为null时，说明已经越过A所有叶子节点，匹配失败，返回false
5. 步骤3、4借用函数 isSub 判断节点值是否相等

### 代码
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
// 递归
var isSubStructure = function(A, B) {
    if (!A || !B) {
        return false;
    }
    return isSub(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
};

// 迭代
var isSubStructure = function(A, B) {
    if (!A || !B) {
        return false;
    } 
    let stack = []
    stack.push(A)
    while(stack.length !== 0) {
        for (let i = 0, len = stack.length; i < len; i++ ) {
            let curr = stack.pop()
            if (isSub(curr, B)) {
                return true
            } else {
                curr.left && stack.unshift(curr.left)
                curr.right && stack.unshift(curr.right)
            }
        }
    }
    return false
};

var isSub = function(rootA, rootB) {
    if (!rootB) {
        return true;
    }
    if (!rootA) {
        return false;
    }
    if (rootA.val == rootB.val) {
        return isSub(rootA.left, rootB.left) && isSub(rootA.right, rootB.right);
    }
    return false;
}
```