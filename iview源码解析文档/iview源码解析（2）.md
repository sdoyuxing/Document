## 上篇问题
在上篇[《iview源码解析（1）》](http://www.cnblogs.com/hetaojs/p/9009965.html)中的index.js 入口文件的源码中有一段代码有点疑惑：
```javascript
/**
 * 在浏览器环境下默认加载组件
 */
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
```
在引用 iview 组件的时候需要
```javascript
Vue.use(iView, { locale });
```
注册组件，即使不执行 use 也把组件注册了，这两段代码不是有重复功能？这么处理的目的是为什么呢？是处理兼容性问题么？有木有大神指点下。
## button 组件
button的核心样式代码是在mixins中，mixins的意思是混入在vue官网上对混入的解释是这样解释<br/>

混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

也就是组件下在细分共享对象来混入。
#### 问题
那在样式当中其他组件的样式也有可能混入到按钮里面的样式函数？但个人感觉应该是很少在其他组件当中用到吧？可能是我对整个iview的库整体不熟悉，有木有大神指点下。<br/><br/>
我们在来看下 mixins 目录下 button.less的源码：
```css

/**函数
 * 设置按钮的内边距、字体大小、边框曲线
 * @param  @padding
 * @param  @font-size
 * @param  @border-radius
 */
.button-size(@padding; @font-size; @border-radius) {
    padding: @padding;
    font-size: @font-size;
    border-radius: @border-radius;
}
/**函数
 * 设置按钮的跟颜色有关的属性：字体颜色、背景颜色、边框颜色、以及子a标签的颜色
 * @param  @color
 * @param  @background
 * @param  @border
 */
.button-color(@color; @background; @border) {
    color: @color;
    background-color: @background;
    border-color: @border;
    // a inside Button which only work in Chrome
    // http://stackoverflow.com/a/17253457
    > a:only-child {
        color: currentColor;
        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: transparent;
        }
    }
}
/**函数
 * 设置按钮的跟颜色有关的属性包括hover、active、disabled颜色变动
 * @param  @color
 * @param  @background
 * @param  @border
 */
.button-variant(@color; @background; @border) {
    .button-color(@color; @background; @border);
    //按钮伪类颜色设置
    &:hover
    //&:focus
    {
        .button-color(tint(@color, 20%); tint(@background, 20%); tint(@border, 20%));
    }
    &:active,
    &.active {
        .button-color(shade(@color, 5%); shade(@background, 5%); shade(@background, 5%));
    }
    //禁用按钮的颜色设置
    &.disabled,
    &[disabled],
    fieldset[disabled] & {
        &,
        &:hover,
        &:focus,
        &:active,
        &.active {
            .button-color(@btn-disable-color; @btn-disable-bg; @btn-disable-border);
        }
    }
}
/**函数
 * 按钮主样式
 */
.btn() {
    display: inline-block;
    margin-bottom: 0;
    font-weight: @btn-font-weight;
    text-align: center;
    vertical-align: middle;
    /**
     *用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作
     *auto:当触控事件发生在元素上时，由浏览器来决定进行哪些操作，比如对viewport进行平滑、缩放等。
     *none:当触控事件发生在元素上时，不进行任何操作。
     */
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: @line-height-base;
    user-select: none;
    .button-size(@btn-padding-base; @btn-font-size; @btn-border-radius);
    //transform: translate3d(0, 0, 0);
    //transition: all @transition-time linear;
    transition: color @transition-time linear, background-color @transition-time linear, border @transition-time linear, box-shadow @transition-time linear;

    > .@{css-prefix-iconfont} {
        line-height: 1;
    }
    //按钮的伪类样式
    &,
    &:active,
    &:focus {
        outline: 0;
    }

    &:not([disabled]):hover {
        text-decoration: none;
    }

    &:not([disabled]):active {
        outline: 0;
        // transition: none;  // 如果不注释此行，那么active会和focus同时触发，此时focus的开始动画transition会无效
    }
    //禁用按钮样式
    &.disabled,
    &[disabled] {
        cursor: @cursor-disabled;
        > * {
            pointer-events: none;
        }
    }
    //设置大按钮
    &-large {
        .button-size(@btn-padding-large; @btn-font-size-large; @btn-border-radius);
    }
    //设置小按钮
    &-small {
        .button-size(@btn-padding-small; @btn-font-size; @btn-border-radius-small);
    }
}
/** 不同类型按钮函数控制颜色
 *  默认按钮、主按键、幽灵按钮、虚线按钮、文字按钮
 */
// Default
.btn-default() {
    .button-variant(@btn-default-color; @btn-default-bg; @btn-default-border);

    &:hover
    //&:focus
    {
        .button-color(tint(@primary-color, 20%); white; tint(@primary-color, 20%));
    }
    &:active,
    &.active {
        .button-color(shade(@primary-color, 5%); white; shade(@primary-color, 5%));
    }
    .active-btn-color(@primary-color);
}

// Primary
.btn-primary() {
    .button-variant(@btn-primary-color; @btn-primary-bg; @primary-color);

    &:hover,
    //&:focus,
    &:active,
    &.active {
        color: @btn-primary-color;
    }
    .active-btn-color(@primary-color);
}

// Ghost
.btn-ghost() {
    .button-variant(@btn-ghost-color, @btn-ghost-bg, @btn-ghost-border);

    &:hover
    //&:focus
    {
        .button-color(tint(@primary-color, 20%); @btn-ghost-bg; tint(@primary-color, 20%));
    }
    &:active,
    &.active {
        .button-color(shade(@primary-color, 5%); @btn-ghost-bg; shade(@primary-color, 5%));
    }
    .active-btn-color(@primary-color);
}

// Dashed
.btn-dashed() {
    .button-variant(@btn-ghost-color, @btn-ghost-bg, @btn-ghost-border);
    border-style: dashed;

    &:hover
    //&:focus
    {
        .button-color(tint(@primary-color, 20%); @btn-ghost-bg; tint(@primary-color, 20%));
    }
    &:active,
    &.active {
        .button-color(shade(@primary-color, 5%); @btn-ghost-bg; shade(@primary-color, 5%));
    }
    .active-btn-color(@primary-color);
}

// Text
.btn-text() {
    .button-variant(@btn-ghost-color, @btn-ghost-bg, transparent);

    // for disabled
    &.disabled,
    &[disabled],
    fieldset[disabled] & {
        &,
        &:hover,
        &:focus,
        &:active,
        &.active {
            .button-color(@btn-disable-color; @btn-ghost-bg; transparent);
        }
    }

    &:hover
        //&:focus
    {
        .button-color(tint(@primary-color, 20%); @btn-ghost-bg; transparent);
    }
    &:active,
    &.active {
        .button-color(shade(@primary-color, 5%); @btn-ghost-bg; transparent);
    }
    .active-btn-color(@primary-color);
}

```
### 知识点（这里面列出来的知识点是我自己不是很熟悉的列出来）
#### 1. color: currentColor<br/>
css3的扩展关键字，currentColor是 color 属性的值，具体意思是指：currentColor关键字的使用值是 color 属性值的计算值。
如果currentColor关键字被应用在 color 属性自身，则相当于是 color: inherit。<br/>
#### 2. background: transparent<br/>
设置背透明
#### 3. tint(color,weight)<br/>
less中的方法,它用于混合颜色与白色,它有以下参数：<br/>
color ：它代表一个颜色对象。<br/>
weight ：这是一个可选参数，通过在颜色和白色之间提供百分比平衡点来指定元素的权重。
#### 4. shade(color,weight)<br/>
less中的方法,它用于混合颜色与黑色,它有以下参数：<br/>
color ：它代表一个颜色对象。<br/>
weight ：这是一个可选参数，通过在颜色和白色之间提供百分比平衡点来指定元素的权重。
#### 5. touch-action: manipulation<br/>
用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作<br/>
auto:当触控事件发生在元素上时，由浏览器来决定进行哪些操作，比如对viewport进行平滑、缩放等。<br/>
none:当触控事件发生在元素上时，不进行任何操作。
#### 6. user-select: none<br/>
css3新增属性，值:<br/>
none：文本不能被选择。<br/>
text：可以选择文本。<br/>
all：当所有内容作为一个整体时可以被选择。如果双击或者在上下文上点击子元素，那么被选择的部分将是以该子元素向上回溯的最高祖先元素。<br/>
element：可以选择文本，但选择范围受元素边界的约束。<br/>
#### 7. outline: 0<br/>
outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。在谷歌浏览器中激活状态默认有轮廓线，这个可以去除那个轮廓线。
#### 8. pointer-events: none;<br/>
css3新增属性，值<br/>
auto：与pointer-events属性未指定时的表现效果相同。在svg内容上与visiblepainted值相同。<br/>
none：元素永远不会成为鼠标事件的target。但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶触发父元素的事件侦听器。<br/>
#### 9. less中把很多通用的属性值赋值到一个变量中。
在custom.less中如：按钮的基础变量
```css
// Button
@btn-font-weight        : normal;
@btn-padding-base       : 6px 15px;
@btn-padding-large      : 6px 15px 7px 15px;
@btn-padding-small      : 2px 7px;
@btn-font-size          : 12px;
@btn-font-size-large    : 14px;
@btn-border-radius      : 4px;
@btn-border-radius-small: 3px;
@btn-group-border       : shade(@primary-color, 5%);
```
#### 10. 里面将样式安装功能拆分成函数相互调用。
#### 11. &代表的上一层选择器的名字。



