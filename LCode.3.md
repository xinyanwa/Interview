# 无重复字符串的最长子串 #

## 维护数组 ##

---

**使用一个数组来维护滑动窗口。**
`什么是滑动窗口？`
`其实就是一个队列`

* 遍历字符串，判断字符是都在滑动窗口数组里面
* 不在则push进数组
* 在则删除滑动窗口数组里面相同字符及相同字符前的字符，然后将当前字符push进数组
  
* 然后将max更新为当前最长子串的长度

![流程图](https://pic.leetcode-cn.com/202ea5bd4d4ba4a21afafdf52a9ea2556ba6265c1576840f09ace50aafab095c.png)

```javascript
var lengthOfLongestSubstring = function(s){
  // 定义空数组，用来保存最大长串
  let arr = []

  // 定义变量max，用来返回最大子串的长度
  let max = 0

  // 循环字符串
  for(let i = 0; i < s.length; i++){
    // 定义变量index用来检测
    let index = arr.indexOf(s[i])

    // 判断循环的元素是否正在arr中
    if(index !== -1){
      // 如果它不在，我们就把他分割出来
      arr.splice(0,index+1)
    }
    // 把他push进数组里面
    arr.push(s.charAt(i))

    // max赋值将最大长度的子串赋值给max
    max = Math.max(arr.length, max)
  }
  // 将max值返回出去
  return max
}
```

## 维护下标 ##

---

**解体思路：** 使用下标来维护滑动窗口(队列)

```javascript
var lengthOfLongestSubstring = function(s){
  // 定义初始数组下标值为0
  let index = 0

  // 定义初始最大长度为0
  let max = 0

  // 循环字符串s
  for(let i = 0, j = 0;j < s.length; j++){
    // substring()方法返回一个字符串在开始索引到结束索引之间的一个子集
    // 或者从开始索引知道字符串的末尾的一个子集
    index = s.substring(i,j).indexOf(s[j])
    // 判断值是否在其中
    if(index !== -1){
      // 如果不在，则加上前面字符串长度
      i = i + index + 1
    }
    // 将最大值赋值给max
    max = Math.max(max, j - i + 1)
  }

  return max
}
```

## 优化Map ##

---

**解题目思路**：

* 使用map来存储当前已经遍历的字符，key为字符，value为下标

* 使用i来标记无重复子串开始的下标

* 遍历字符串，判断当前字符是否已经在map中存在在，存在则更新无重复子串开始的下标

* i为相同字符串的下一个位置，此时从i到j为最新的无重复子串，更新max，将当前字符与下标放入map中

* 最后返回max

```javascript
var lengthOfLongestSubstring = function(s){
  // 定义map结构
  let map = new Map()

  // 定义初始最大长度为0
  let max = 0

  // 对字符串进行循环
  for(let i = 0, j = 0; j < s.length; j++){
    // 判断字符是否在map中
    if(map.has(s[j])){
      // 将最大值更新成i
      i = Math.max(map.get[j] +1, i)
    }
    // 设置最大值max
    max = Math.max(max, j - i + 1)

    // 更新map里面数据
    map.set(s[j],j)
  }
  return max
}
```
