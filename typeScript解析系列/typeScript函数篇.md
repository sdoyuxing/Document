> `typeScript`的函数是在es6的函数特性的基础上加了一些后端的概念：泛型、参数类型声明、返回值类型声明、重载、装饰器等。其他的一些特性：箭头函数、生成器、async-await、promise等都是es6的加的特性。
### 函数类型
JavaScript的函数参数是可以任何类型的，typeScript中加了对参数提添加类型，函数本身添加返回值类型。
```typescript
function greetNane(name: string): string {
  return `hello ${name}`
}
```
还有一种函数声明的方式：
```typescript
let greetNane: (name: string) => string = function (name: string): string {
    return `hello ${name}`
}
```
typeScript中函数调用时传的参数类型和数量和函数声明时候不匹配会报错。
### 可选参数和默认参数
可选参数：typeScript中设置函数中一个参数可传也可不传的。
```typescript
let greetNane: (name: string, age?: number) => string = function (name: string, age?: number): string {
    return `hello ${name}`
}
```
默认参数：和es6的默认参数写一样，也可以在参数后面加类型。
```typescript
let greetNane: (name: string, age: number = 0) => string = function (name: string, age: number = 0): string {
    return `hello ${name} ${age}`
}
```
```typescript
let greetNane: (name: string, age = 0) => string = function (name: string, age = 0): string {
    return `hello ${name} ${age}`
}
```
### 剩余参数
typeScript剩余参数和es6的写法差不多，也是后面加个参数的类型。
```typescript
let greetNane: (name: string, ...arrs: string[]) => string = function (name: string, ...arrs: string[]): string {
    return `hello ${name} ${age}`
}
```
...的用法和es6的一样。
> 注：因为现在主流浏览器都没有完全支持es6，所有在实际项目中es6和typescript都是最后转换成es5的写法。剩余参数的转换成es5是遍历arguments参数将参数放到arrs数组中。
```javascript
    var arrs=[];
    for (var _i = 0, coumt = arguments.length; i < coumt; i++) {
      arrs[_i]=arguments[_i];
    }
```
如果你认为这个可能对应用程序带来性能问题,应考虑不使用剩余参数只使用数组作为参数。
### 重载
函数重载或方法重载是名称相同并且参数数量类型不同创建多个方法的能力。
typeScript中通过声明函数标签，最后在一个标签实现函数的。
```typescript
function greetNane(name:string) :string;
function greetNane(name:number) :number;
function greetNane(name:boolean) :boolean;
function greetNane(name:(string|number|boolean)):any{
    return name;
}
```
### 泛型
作用域，this，箭头函数就不说了，直接说泛型，泛型来创建可重用的组件，一个组件可以支持多种类型的数据。
```typescript
function greetNane<T>(name:T):T{
    return name
}

greetNane<string>('name')
greetNane('name')
```
函数根据参数的类型来返回对应类型的值。

---

> 参考书籍文档：
  - 《Learning TypeScript》
  - [TypeScript中文网](https://www.tslang.cn/docs/home.html)