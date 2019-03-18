> 面向对象是typescript的核心部分，这里先介绍下面向对象的七大原则：

- 单一原则：一个类子负责一个职责。
- 里氏替换原则：子类可以在任何地方替换它的父类。
- 依赖倒置原则：代码要依赖于抽象的类，而不要依赖于具体的类；要针对接口或抽象类编程，而不是针对具体类编程。
- 接口隔离原则：提供尽可能小的单独接口，而不要提供大的总接口。暴露行为让后面的实现类知道的越少越好。
- 迪米特法则：尽量降低类与类之间的耦合。
- 开闭原则：面向扩展开放，面向修改关闭
- 组合/聚合复用原则：尽量使用合成/聚合达到复用，尽量少用继承。原则： 一个类中有另一个类的对象。

这里不作详细的介绍去百度面向对象的七大原则有很多文章很详细[《面向对象原则综述》](https://www.cnblogs.com/bdpsc/p/5237606.html)，这里简单描述下概念;
### 类
es6中类的声明：
```typescript
class Demo {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    print() {
        console.log(this.a + ' ' + this.b);
    }
}
```
typeScript中类的声明：
```typescript
class Demo {
    public a:string;
    public b:string;
    constructor(a:string, b:string) {
        this.a = a;
        this.b = b;
    }

    print() {
        console.log(this.a + ' ' + this.b);
    }
}
```
根据单一原则，类的拆分粗细程度一定程度上是开发人的主观选择，举个前端会经常遇到的例子，验证包括姓名验证，电话验证，数字验证，邮件验证，日期验证等等。这些验证是放在类中处理好点还是每一种单独声明一个类更合适呢？放在类中处理会使验证方法的复用率低，造成代码冗余。每个验证都声明一个类又换感觉类很多。《Learning TypeScript》中提议是一个验证声明一个类。代码如下：
```typescript
class Email{
    private email:string;
    constructor(email:string){
        if(this.validateEmail(email)){
            this.email=email;
        }else{
            throw new Error("Invalid email!");
        }
    }
    private validateEmail(email:string):boolean{
        var re=/\S+@\S+\.\S+/
        return re.test(email);
    }
    get():string{
      return this.email;
    }

}
class Person{
    public name:string;
    public age:number;
    public email:Email;
    constructor(name:strng,age:number,email:Email){
        this.name=name;
        this.age=age;
        this.email=email;
    }
}
```
这样邮件的验证就是在`Email`中验证格式。

### 继承
typescript中继承的实现方式为
```typescript
class Person{
    public name:string;
    public age:number;
    constructor(name:strng,age:number){
        this.name=name;
        this.age=age;
    }
    cons(text:string){
      console.log(`Hi! ${this.name},${text}`);
    }
}
class Man extends Person{
    sex:string;
    constructor(name:strng,age:number,sex:string;){
        super(name,age)
        this.sex=sex
    }
    cons(text:string){
        super.cons(`man,${text}`)
    }
}
let sam = new Person("li lei",12);
let tom: Person = new Man("小明",20);
```
例子中派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。Man继承Person，并且重写了cons方法，方法中调用了父类的cons方法。
### 类属性权限修饰符
-  public（默认）公共属性：派生类、类的实例对象都可以访问。
```typescript
class Person{
    public name:string;
    public age:number;
    constructor(name:strng,age:number){
        this.name=name;
        this.age=age;
    }
    cons(text:string){
      console.log(`Hi! ${this.name},${text}`);
    }
}
```
- private 私有属性：派生类、类的实例对象不可以访问。
```typescript
class Person{
    private name:string;
    public age:number;
    constructor(name:strng,age:number){
        this.name=name;
        this.age=age;
    }
    cons(text:string){
      console.log(`Hi! ${this.name},${text}`);
    }
}
new Person("Cat"，12).name; // 错误: 'name' 是私有的.
```
- protected 保护属性：派生类可以访问、类的实例对象不可以访问。
```typescript
class Person{
    protected name:string;
    public age:number;
    constructor(name:strng,age:number){
        this.name=name;
        this.age=age;
    }
}
class Man extends Person{
    sex:string;
    constructor(name:strng,age:number,sex:string;){
        super(name,age)
        this.sex=sex
    }
    cons(text:string){
         console.log(`Hi! ${this.name},${text}`);
    }
}
new Man("Cat"，12).name; // 错误,name是保护属性
```
- readonly 修饰符：readonly关键字将属性设置为只读的。
```typescript
class Person{
    readonly name:string;
    public age:number;
    constructor(name:strng,age:number){
        this.name=name;
        this.age=age;
    }
}
let dad =new Person("Cat"，12);
dad.name = "小明"; // 错误! name 是只读的.
```
### 存取器
TypeScript支持通过getters/setters来截取对对象成员的访问。

```typescript
class Person{
    private _name:string;
    get name():string{
        return this._name;
    }
    set name(name:string){
        this._name=name;
    }
}
let man = new Employee();
man.name='小明';
```

> 参考书籍文档：
  - 《Learning TypeScript》
  - [TypeScript中文网](https://www.tslang.cn/docs/home.html)
