### 接口
> 接触过面向对象的后端语言的应该对接口很熟悉，只接触过前端的对接口会有点陌生，在维基百科中对OOP中接口的定义是这样的：
>
>       在面向对象的语言中，术语interface经常被用来定义一个不包含数据和逻辑代码但用函数签名定义了行为的抽象类型。
> 实现一个接口可以被看成是签署了一份协议,接口好比是协议，当我们签署它时，必须遵守它的规则，接口的规则是方法和属性的签名，我们不想实现它们。

在typescript中最常用到接口的场景是用接口作为参数的类型检查。

```typescript
 interface BaseButtonProps {
  icon: string;
}
function printButton(buttonProps: BaseButtonProps) {
  console.log(buttonProps.icon);
}
let myObj = {icon:'add'};
printButton(myObj);
```
在调用printButtonh函数的时候类型检查器会查看参数对象是要求包含icon属性的。
#### 可选属性
用?来这个属性是可选属性
```typescript
 interface BaseButtonProps {
  icon?: string;
}
```
#### 只读属性
属性名前用 readonly来指定只读属性
```typescript
 interface BaseButtonProps {
   readonly icon?: string;
}
```
### 泛型类型
先看下简单泛型
```typescript
function greetNane<T>(name:T):T{
    return name
}

let myIdentity: <T>(name: T) => T = greetNane;
```
我们还可以使用带有调用签名的对象字面量来定义泛型函数：

```typescript
function greetNane<T>(name:T):T{
    return name
}
let myIdentity: {<T>(name: T): T} = greetNane;
```
这引导我们去写第一个泛型接口了。 我们把上面例子里的对象字面量拿出来做为一个接口：
```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function greetNane<T>(name:T):T{
    return name
}

let myIdentity: GenericIdentityFn<number> = greetNane;
```
#### 泛型类
```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```
泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
#### 泛型约束
```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```
现在这个泛型函数被定义了约束