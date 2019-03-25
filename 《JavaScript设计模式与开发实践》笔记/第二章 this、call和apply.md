# 第二章 this、call和apply
- this 的指向大致可以分为4种
   * 作为对象的方法调用：当函数作为对象的方法被调用时，this 指向该对象。
   * 作为普通函数调用：普通函数方式，this 指向全局对象，在浏览器的JavaScript 里，这个全局对象是window 对象。
   * 构造器调用：当用new 运算符调用函数时，该函数总会返回一个对象，构造器里的this 就指向返回的这个对象。注意：用new 调用构造器时，如果构造器显式地返回了一个object 类型的对象，那么此次运算结果最终会返回这个对象。
   * Function.prototype.call或Function.prototype.apply调用：用Function.prototype.call 或Function.prototype.apply 可以动态地改变传入函数的this。
- 丢失的this
```javascript
   var obj = {
        myName: 'sven',
        getName: function () {
            return this.myName;
        }
    };
    console.log(obj.getName()); // 输出：'sven'
    var getName2 = obj.getName;
    console.log(getName2()); // 输出：undefined
```
- call和apply的区别
   * apply 接受两个参数，第一个参数指定了函数体内this 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply 方法把这个集合中的元素作为参数传递给被调用的函数。
   * apply 比call 的使用率更高，我们不必关心具体有多少参数被传入函数。
   * call 是包装在apply 上面的一颗语法糖。
   * 当使用call 或者apply 的时候，如果我们传入的第一个参数为null，函数体内的this 会指向默认的宿主对象，在浏览器中则是window，在严格模式下，函数体内的this 还是为null。
- call和apply的用途
   * 改变this 指向
   * Function.prototype.bind：模拟实现bind
```javascript
    Function.prototype.bind = function (context) {
        var self = this; // 保存原函数
        return function () { // 返回一个新的函数
            return self.apply(context, arguments); // 执行新的函数的时候，会把之前传入的context
            // 当作新函数体内的this
        }
    };
    var obj = {
        name: 'sven'
    };
    var func = function () {
        alert(this.name); // 输出：sven
    }.bind(obj);
    func();
```
- 借用其他对象的方法
   * 借用构造函数
```javascript
   var A = function (name) {
        this.name = name;
    };
    var B = function () {
        A.apply(this, arguments);
    };
    B.prototype.getName = function () {
        return this.name;
    };
    var b = new B('sven');
    console.log(b.getName()); // 输出： 'sven'
```
   * 借用对象的方法
```javascript
(function () {
        Array.prototype.push.call(arguments, 3);
        console.log(arguments); // 输出[1,2,3]
    })(1, 2);
```