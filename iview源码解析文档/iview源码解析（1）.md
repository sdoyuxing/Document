## 概述
公司技术栈开始用vue主导开发，但因为公司前端会vue的不多所以在项目中用到vue的技术不是很深，之前出去面试被接连打击，而且本来打算开始为公司vue的项目构建自己的组件库所以去下载了[iview](https://www.iviewui.com/)
的[源码](https://github.com/iview/iview)
打算研究一番，学习大神的组件封装模式和vue的深层技术的运用，随便写博客系列来记录下自己的心得，因为是个人总结所以可能在认识会有点局限也欢迎各路大神一起讨论学习。
## iview目录结构

![](https://images2018.cnblogs.com/blog/960483/201805/960483-20180508101510764-203130855.png)

1.assets—图片存放目录<br/>
2.build—Webpack配置存放目录<br/>
3.dist—打包之后页面存放目录<br/>
4.examples—组件的demo页面存放目录<br/>
5.src—组件根目录<br/>
6.components—组件存放目录<br/>
7.directives—组件封装的指令存放目录<br/>
8.locale—组件封装的语言配置存放目录<br/>
9.mixins—组件封装的混入存放目录<br/>
10.styles—组件的样式根目录<br/>
11.animation—动画样式<br/>
12.common—公共样式<br/>
13.components—组件样式<br/>
14.mixins—混入样式<br/>
15.custom.less—样式公共变量<br/>
16.index.less—样式入口<br/>
17.utils—组件内部公共方法<br/>
18.index.js—组件入口
## 源码解析
#### index.js 入口
```javascript
/**
 * 配置语言、加载组件
 * @param {Object} Vue 
 * @param {Object} opts 
 */
const install = function(Vue, opts = {}) {
    if (install.installed) return;
    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    Object.keys(iview).forEach(key => {
        Vue.component(key, iview[key]);
    });

    Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$Message = Message;
    Vue.prototype.$Modal = Modal;
    Vue.prototype.$Notice = Notice;
    Vue.prototype.$Spin = Spin;
};
/**
 * 在浏览器环境下默认加载组件
 */
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
/**
 * 组件vue.user的对象
 */
const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    locale: locale.use,
    i18n: locale.i18n,
    install,
    Circle,
    Switch,
    ...components
};

API.lang = (code) => {
    const langObject = window['iview/locale'].default;
    if (code === langObject.i.locale) locale.use(langObject);
    else console.log(`The ${code} language pack is not loaded.`); // eslint-disable-line no-console
};
/**
 * 输出对象
 */
module.exports.default = module.exports = API;   // eslint-disable-line no-undef

```
在 examples 文件中的 main.js 中加载 iview 组件
![](https://images2018.cnblogs.com/blog/960483/201805/960483-20180508105815997-1505796350.jpg)

#### 知识点：use
vue 的 use 源码：<br/>
```javascript
import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
    /**
     * 判断参数fn是fn的话直接运行fn，是对象的话运行对象里的install方法
     * @param {Function|Object} plugin 下面参数类型限制是typescript的写法
     * @returns Vue
     */
  Vue.use = function (plugin: Function | Object) {
    //   判断该方法或对象是否已经注册过
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
      
    // 将参数转化为数组
    const args = toArray(arguments, 1)
    // 把vue对象插到数组第一个
    args.unshift(this)
    // 判断plugin对象的install是否是方法
    if (typeof plugin.install === 'function') {
        // 将plugin对象的install执行并且this指向plugin
      plugin.install.apply(plugin, args)
    //   如果plugin是方法
    } else if (typeof plugin === 'function') {
    // 执行plugin方法this指向null
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```
看源码我们可以知道在我们以后编写插件的时候可以有两种方式。
一种是将这个插件的逻辑封装成一个对象最后将最后在 install 编写业务代码暴露给 Vue 对象。这样做的好处是可以添加任意参数在这个对象上方便将 install 函数封装得更加精简，可拓展性也比较高。
还有一种则是将所有逻辑都编写成一个函数暴露给 Vue。
其实两种方法原理都一样，无非第二种就是将这个插件直接当成 install 函数来处理。

#### button组件
button的功能不是很多，主要是样式，所以学习 button 组件大部分时间是看样式。vue 组件在目录:<br/>
![](https://images2018.cnblogs.com/blog/960483/201805/960483-20180508115207800-1203586112.jpg)<br/>
组件样式目录：<br/>
![](https://images2018.cnblogs.com/blog/960483/201805/960483-20180508142801018-366209227.jpg)
<br/>
组件样式混入目录：<br/>
![](https://images2018.cnblogs.com/blog/960483/201805/960483-20180508115650661-615088118.jpg)

在分析样式之前我们先去官网上看 iview 按钮组件的大概分了哪种模式和按钮交互上的一些细节。大类上按钮分为单个按钮和按钮组两类。
#### 单个按钮

1).字体居中不换行。<br/>
2).默认按钮、幽灵按键 hover 边框颜色和字体颜色改变，过渡效果,主按键 hover 背景颜色变浅20%。<br/>
3).所有按键 active 加阴影，阴影颜色和背景色相同，过渡效果。<br/>
1.默认按钮、主按键、幽灵按钮、虚线按钮、文字按钮(因为这些种类的按钮在实际用到比较多的是主按键和幽灵按键，所以在自己模拟组件的主要实现了这两张按键)按钮的交互效果：<br/>
![](https://images2018.cnblogs.com/blog/960483/201805/960483-20180508140314822-496328690.jpg)<br/>
2.图标按钮<br/>
![](https://images2018.cnblogs.com/blog/960483/201805/960483-20180508140411065-1249008860.jpg)<br/>
3.按钮组合<br/>
![](https://images2018.cnblogs.com/blog/960483/201805/960483-20180508140453326-1122783610.jpg)<br/>
更细的分类可以看 [iview官网api](https://www.iviewui.com/components/button)。


