
# 第二题 #

---

给出两个非空发链表用来表示两个非负的整数，其中他们各自的位数时按照逆序的方式存储的，并且每个节点只能储存以为数字
**我们需要将这两个数相加，返回一个新的链表来表示他们的和**

```javascript
输入：(2 -> 4 ->3) + (5 -> 6 -> 4)
输出：7 -> 0 ->8
原因： 342 + 465 = 807
```

根据加法计算过程我们知道应该首先从低位开始，也是就时先计算 2 + 5 = 7

1.首先取出左右两边个数的最低位

```javascript
let val1 = l1.val
let val2 = l2.val
```

2.其次求出他们的和作为输出结果的最低位

```javascript
let sum = new ListNode('0')
sum.next = new ListNode((val1 + val2) % 10)
```

所以，我们可以写出代码

```javascript
var addTwoNumbers = function(l1, l2){
  // 做加法是有进位的
  let addOne = 0

  // 创建一个头链表用于保存结果
  let sum = new ListNode('0')
  
  // 保存头链表的位置用于最后链表返回
  let head = sum

  // 在进位或两个链表之中有一个存在的前提下执行
  while(addOne || l1 || l2){
    // 如果值不存在，我要将其设置为0
    let val1 = l1 !== null ? l1.val : 0
    let val2 = l2 !== null ? l2.val : 0

    // 对两个结果相加求和,还要加上进位
    let s = val1 + val2 + addOne

    // 如果求和结果大于10，表示进位，进位为1，否则为0
    addOne = s >= 10 ? 1 : 0

    // sum的下一个节点
    sum.next = new ListNode(s % 10)

    // 让sum指向下一个节点
    sum = sum.next

    // l1指向下一个节点，一边计算第二个节点的值
    if(l1) l1 = l1.next

    // l2做法也和上面相同
    if(l2) l2 = l2.next
  }
  // 返回计算结果，这里使用head.next，因为它里面保存的第一个节点时刚开始定义的
  return head.next
}
```
