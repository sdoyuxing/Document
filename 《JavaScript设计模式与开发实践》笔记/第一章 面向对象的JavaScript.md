# 第一章 面向对象的JavaScript
1. 动态类型语言和鸭子类型

   * 编程语言按照数据类型大体可以分为两类：静态类型语言、动态类型语言。
   * 静态类型语言：在编译时便已确定变量的类型。
      * 优点：
         1. 在编译时就能发现类型不匹配的错误。
         2. 在程序中明确地规定了数据类型，编译器还可以针对这些信息对程序进行一些优化工作，提高程序执行速度。
      * 缺点：类型的声明也会增加更多的代码，会让程序员的精力从思考业务逻辑上分散开来。
   * 动态类型语言：变量类型要到程序运行的时候，待变量被赋予某个值之后，才会具有某种类型。
      * 优点：
         1. 编写的代码数量更少，看起来也更加简洁，程序员可以把精力更多地放在业务逻辑上面。
         2. 编码灵活。
      * 缺点：无法保证变量的类型，从而在程序的运行期有可能发生跟类型相关的错误。
   * JavaScript是一门典型的动态类型语言。
   * 鸭子类型：如果它走起路来像鸭子，叫起来也是鸭子，那么它就是鸭子。

2. 多态：同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。

   * 多态JavaScript例子:
```javascript
var makeSound = function (animal) {
    if (animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯');
    }
};
var Duck = function () {};
var Chicken = function () {};
makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯
```
   * 对象的多态性：
```javascript
var makeSound = function (animal) {
    animal.sound();
};
var Duck = function () {}
Duck.prototype.sound = function () {
    console.log('嘎嘎嘎');
};
var Chicken = function () {}
Chicken.prototype.sound = function () {
    console.log('咯咯咯');
};
makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯
```
   * 类型检查和多态：在静态类型语言中编译时会进行类型匹配检查，不能给变量赋予不同类型的值所以需要向上转型(当给一个类变量赋值时，这个变量的类型既可以使用这个类本身，也可以使用这个类的超类)。
   * 使用继承得到多态效果
      * 继承通常包括实现继承和接口继承。
      * 实现继承例子：
    先创建一个Animal 抽象类，再分别让Duck 和Chicken 都继承自Animal 抽象类
```java
public abstract class Animal {
    abstract void makeSound(); // 抽象方法
}
public class Chicken extends Animal {
    public void makeSound() {
        System.out.println("咯咯咯");
    }
}
public class Duck extends Animal {
    public void makeSound() {
        System.out.println("嘎嘎嘎");
    }
}
Animal duck = new Duck(); // (1)
Animal chicken = new Chicken(); // (2)
public class AnimalSound {
    public void makeSound(Animal animal) { // 接受Animal 类型的参数
        animal.makeSound();
    }
}
public class Test {
    public static void main(String args[]) {
        AnimalSound animalSound = new AnimalSound();
        Animal duck = new Duck();
        Animal chicken = new Chicken();
        animalSound.makeSound(duck); // 输出嘎嘎嘎
        animalSound.makeSound(chicken); // 输出咯咯咯
    }
}
```
   * JavaScript的多态
      * 多态的思想实际上是把“做什么”和“谁去做”分离开来。
      * 在JavaScript 中，并不需要诸如向上转型之类的技术来取得多态的效果。
   * 多态在面向对象程序设计中的作用
      * 《重构：改善既有代码的设计》里写到：多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答案调用对象的某个行为——你只管调用该行为就是了，其他的一切多态机制都会为你安排妥当。
      * 多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句。
      * 地图应用例子：
```javascript
var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};
var baiduMap = {
    show: function () {
        console.log('开始渲染百度地图');
    }
};
var renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show();
    }
};
renderMap('google'); // 输出：开始渲染谷歌地图
renderMap('baidu'); // 输出：开始渲染百度地图
```
3. 封装：封装的目的是将信息隐藏

   * 封装数据：JavaScript 并没有提供对这些关键字的支持，我们只能依赖变量的作用域来实现封装特性，而且只能模拟出public 和private 这两种封装性。例子：

```javascript
var myObject = (function () {
var __name = 'sven'; // 私有（private）变量
return {
    getName: function () { // 公开（public）方法
        return __name;
    }
    }
})();
console.log(myObject.getName()); // 输出：sven
console.log(myObject.__name) // 输出：undefined\
```
   * 封装类型：封装类型是通过抽象类和接口来进行的。把对象的真正类型隐藏在抽象类或者接口之后，JavaScript 中，并没有对抽象类和接口的支持。
   * 封装变化：封装在更重要的层面体现为封装变化，《设计模式》一书曾提到如下文字，“考虑你的设计中哪些地方可能变化，这种方式与关注会导致重新设计的原因相反。它不是考虑什么时候会迫使你的设计改变，而是考虑你怎样才能够在不重新设计的情况下进行改变。这里的关键在于封装发生变化的概念，这是许多设计模式的主题。”
4. 原型模式和基于原型继承的JavaScript对象系统：JavaScript 也同样遵守这些原型编程的基本规则

   * 所有的数据都是对象
         1. 基本类型包括undefined、number、boolean、string、function、object。
         2. JavaScript 中的根对象是Object.prototype 对象，Object.prototype 对象是一个空的对象。
   * 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
