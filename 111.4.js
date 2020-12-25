/**
 * 
1、今天我们进行如何判断this指向

    确定this指向就是确定函数的执行上下文，也是就是谁先调用他，有下面几种判断方法


2、独立函数调用this

    例如：
 */

 function foo(){
     console.log(this.a);
 }

 const a = 2;

 foo(); // 2

 // 这种直接调用的方式  this指向的是全局对象，如果是在浏览器中就指向window


 /**
  * 2、对象上下文(隐式绑定)
  */

  function foo(){
      console.log(this.a);
  }

  const obj = {
      a: 2,
      foo: foo,
  };
  obj.foo(); // 2

    // foo虽然被定义在全局作用域，但是调用的时候是通过obj上下文引用的，可以理解为在foo调用的那时候他被obj对象拥有，所以this指向的是obj

    // 链式调用的情况下只有最后一层才会影响调用位置

obj1.obj2.obj3.fn(); 
    // 其中，fn中的this指向的是obj3

    // 引式丢失

function foo(){
    console.log(this.a);
}

const obj = {
    a:2,
    foo:foo,
};
const bar = obj.foo;
var a = 'xxxxx'
bar(); // xxxxx
    // 这里的bar其实是引用了obj.foo的地址，这个地址指向的是一个函数，也就是说bar的调用其实符合“独立函数调用规则”，所以他的this不是obj
    // 回调函数就是隐式丢失

{
    function foo(){
        console.log(this.a);
    }
    
    const obj = {
        a: 2,
        foo: foo,
    };

    const a = 'xxxxx'
    setTimeout(obj.foo,1000);  // xxxxx
}
    // 我们观察到，回调函数虽然是通过obj引用1的，但是this也不是obj了，其实内置的setTimeout()函数的实现和下面的伪代码类似;
{
    function setTimeout(fn,delay){
        fn();
    }
}
    // 这段代码隐藏的一个操作就是fn = obj.foo 


    /**
     * 3、显示绑定
     * 显示绑定和引式绑定时相对的，指的时通过call、aooly、bind显示的更改this的指向
     * 这三个方法第一个参数时this要指向的对象
     * 如果你给第一个参数传递一个值(字符串，布尔，数字)类型的话，这个值会被转换成对象形式(调用new String(...)、 new Boolean(...)、new Number(...))
     * 这三个方法中的bind方法比较特殊，它可以延迟方法的执行，这可以让我们写出更加灵活的代码
     */

{
    function foo(something){
        console.log(this.a,something);
        return this.a+something;
    }

    // bind()方法创建一个新的函数，在bind()被调用时，这个新函数this被指定为bind()的第一个参数，二其余参数将作为性函数的参数，供调用时使用
    function bind(fn,obj){
        return function(){
            // apply()方法能劫持另外一个对象的方法，继承另外一个对象的属性。这个方法能接收两个参数；    obj：这个对象将代替Function类里this对象         args：这时数组，他将作为参数传递给Function(args-》arguments)
            return fn.apply(obj,arguments);
        };
    }

    const obj = {
        a:2,
    };

    const bar = bind(foo,obj);
    const b = bar(3); // 2,3
    console.log(b); // 5
}
 // 但是当第一个参数传入null或者undefined，这个值就会被忽略，相当于符合函数独立调用规则


/**
 * 4、new 绑定
 * 
 * js中new与传统的面向类的语言机制不同，js中的“构造函数”其实和普通函数没有任何区别，当我们使用new来调用函数的时候，发生了下面事情
 * 
 * 创建一个全新的的对象
 * 这个对象会被执行“原型”链接
 * 这个新对象会被绑定到调用的this
 * 如果函数没有对象类型的返回值，这个对象会被返回
 * 
 * 其中，第三步绑定了this，所以“构造函数”和原型中的this永远指向new出来的实例
 */


 /**
  * 5、优先级
  * 
  * 以上四条判断规则的权重是递增的，判断顺序为
  * 
  * 函数是new出来，this指向实例
  * 函数通过callapplybbind绑定过，this指向的是第一个参数
  * 函数在某个上下文中调用(引式绑定)，this指向上下文对象
  * 以上都不是，this指向全局对象
  */


/**
 * 6、严格模式下的差异
 * 
 * 以上所说的都是在非严格模式下成立，严格模式下的this指向1是偶差异的
 * 
 * 独立函数调用：this指向的是undefined
 * 对象上的方法：this永远指向该对象
 * 其他的没有区别
 */


 /**
  * 7、箭头函数中的this
  * 
  * 箭头函数不是通过function关键字定义的，也不使用上面this规则，而是“继承外层作用域中的this指向”
  */

  {
      // 创建定时器，外面建立this指向，按理应该指向window
      function foo(){
          const self = this;
          setTimeout(()=>{
              console.log(self);// undefined？
          },1000);
      } 
  }


  /**
   * 8、getter和setter中this指向
   * 
   * es6中的getter或者setter函数会把this绑定到设置或获取的对象上
   * 
   */

   {
       function sun(){
           return this.a + this.b + this.c;
       }

       const o ={
           a: 1,
           b: 2,
           c: 3,
           get average(){
               return (this.a + this.b + this.c) / 3;
           }
       };

       Object.defineProperty(0,'sum',{get: SVGNumber,enumerable:true,configurable:true});
       console.log(o.average,o.sun); // log 2,6
   }