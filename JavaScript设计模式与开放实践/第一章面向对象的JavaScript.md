- 编程语言类型：静态类型语言、动态类型语言。鸭子类型：如果它走起
路来像鸭子，叫起来也是鸭子，那么它就是鸭子。例如，一个对象若有push 和pop 方法，并且这些方法提供了正确的实现，它就可以被当作栈来使用。一个对象如果有length 属性，也可以依照下标来存取属性（最好还要拥有slice 和splice 等方法），这个对象就可以被当作数组来使用。

- 多态：同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结
果。换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与 “可能改变的事物”分离开来。

- 在静态类型语言中，要实现“面向接口编程”并不是一件容易的事情，往往要通过抽象类或者接口等将对象进行向上转型。当对象的真正类型被隐藏在它的超类型身后，这些对象才能在类型检查系统的“监视”之下互相被替换使用。只有当对象能够被互相替换使用，才能体现出对象多态性的价值。

- 多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答
案调用对象的某个行为——你只管调用该行为就是了，其他的一切多态机制都会为你安
排妥当。

多态例子（加了把不变的部分隔离出来，把可变的部分封装起来）
```javascript
var makeSound = function (animal) {
  animal.sound()
}
var Duck = function () {}
Duck.prototype.sound = function () {
  console.log('嘎嘎嘎')
}
var Chicken = function () {}
Chicken.prototype.sound = function () {
  console.log('咯咯咯')
}
makeSound(new Duck()) // 嘎嘎嘎
makeSound(new Chicken()) // 咯咯咯
```
```javascript
var googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图')
  }
}
var baiduMap = {
  show: function () {
    console.log('开始渲染百度地图')
  }
}
var renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show()
  }
}
renderMap(googleMap) // 输出：开始渲染谷歌地图
renderMap(baiduMap) // 输出：开始渲染百度地图
```

 - 封装数据：JavaScript 并没有提供对这些关键字的支持，我们只能依赖变量的作用域来实现封装特性，而且只能模拟出public 和private 这两种封装性。

```javascript
 var myObject = (function () {
  var __name = 'sven' // 私有（private）变量
  return {
    getName: function () { // 公开（public）方法
      return __name
    }
  }
})()
console.log(myObject.getName()) // 输出：sven
console.log(myObject.__name) // 输出：undefined
```

- 封装实现:封装实现细节，封装使得对象内部的变化对其他对象而言是透明的，也就是不可见的。对象对它自己的行为负责。其他对象或者用户都不关心它的内部实现。封装使得对象之间的耦合变松散，对象之间只通过暴露的API 接口来通信。当我们修改一个对象时，可以随意地修改它的内部实现，只要对外的接口没有变化，就不会影响到程序的其他功能。

- 封装类型：是静态类型语言中一种重要的封装方式。一般而言，封装类型是通过抽象类和接口来进行的。

- 封装变化：考虑你的设计中哪些地方可能变化，这种方式与关注会导致重新设计的原因相反。它不是考虑什么时候会迫使你的设计改变，而是考虑你怎样才能够在不重新设计的情况下进行改变。这里的关键在于封装发生变化的概念，这是许多设计模式的主题。设计模式：
 