> 因为在忙其他事情好久没有更新[iview](https://www.iviewui.com/docs/guide/introduce)的源码，也是因为后面的一些组件有点复杂在考虑用什么方式把复杂的功能逻辑简单的展示出来，还没想到方法，突然想到[element](http://element-cn.eleme.io/#/zh-CN)的组件基本也差不多，内部功能的逻辑也差不多，就一起来看源码，element用的css预处理器是sass。
### 项目结构
<p style="text-align: center">
  <img src="https://images2018.cnblogs.com/blog/960483/201808/960483-20180802161019329-810264619.png" />
</p>

- `build`：放置webpack的配置文件。
- `examples`：放置element api的页面文档。
- `packages`：放置element的组件（css样式放置在这个目录下`theme-chalk`下）。
- `src/directives`：放置自定义指令。
- `src/locale`：放置语言的配置文件。
- `src/mixins`：放置组件用的混合文件。
- `src/transitions`：放置动画配置文件。
- `src/utils`：放置用到工具函数文件。
- `src/index.js`：组件注册的入口文件。
- `test`：测试文件。
- `types`：这个文件里放了typescript的数据类，还没找到哪里用了这里的类，欢迎大神留言指点

---

个人还是比较喜欢iview的项目结构（[iview源码解析（1）](https://zhuanlan.zhihu.com/p/36618167)），感觉更清晰一点，项目结构的目的还是有序的管理代码,根据团队实际习惯选择哪种结构。index.js的组件注册和iview的差不多，这里就不重复了。
### 样式
element的样式用的是sass，而且在class的命名上和iview有点差别。

element的样式：
```css
  @include when(disabled) {
    .el-input__inner {
      background-color: $--input-disabled-fill;
      border-color: $--input-disabled-border;
      color: $--input-disabled-color;
      cursor: not-allowed;

      &::placeholder {
        color: $--input-disabled-placeholder-color;
      }
    }

    .el-input__icon {
      cursor: not-allowed;
    }
  }
```
在看下最后编译的class命名：
```css
.el-input--medium .el-input__inner {
    height: 36px;
    line-height: 36px;
}
.el-input--suffix .el-input__inner {
    padding-right: 30px;
}
```
可以看出命名规则是BEM 命名规范（[了解更多](https://zhuanlan.zhihu.com/p/33188830)）B(代表块)__E(代表元素)--M(代表修饰符)

iview的样式代码：
```css

    // prefix & suffix
    &-prefix, &-suffix{
        width: 32px;
        height: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        i{
            font-size: 16px;
            line-height: @input-height-base;
            color: @subsidiary-color;
        }
    }
    &-suffix{
        left: auto;
        right: 0;
    }
    &-wrapper-small &-prefix, &-wrapper-small &-suffix{
        i{
            font-size: 14px;
            line-height: @input-height-small;
        }
    }
```
命名也带有B、E、M的意思但中间是`-`分开。

---

凑点文字篇幅，把[Ant Design of React](https://ant.design/docs/react/introduce-cn)的项目结构也奉上把。

<p style="text-align: center">
  <img src="https://images2018.cnblogs.com/blog/960483/201808/960483-20180802161541213-791022194.png" />
</p>

- `components`:放置组件文件（文档、样式都放在这里面）。
- `components/demo`:组件的api文档。
- `components/tyle`:组件的样式文件。
- `components/index.tsx`:组件的入口文件。
- `docs`:Ant Design of React相关文档。
- `scripts`:打包的配置文件。
- `site`:公共文件，包括样式，js，语言配置文件。
- `tests`:测试文件。

Ant Design of React的样式的命名规则和iview差不多也是用less，就不多说了。
