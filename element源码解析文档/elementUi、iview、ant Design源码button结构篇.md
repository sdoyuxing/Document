> 在看elementUI的button组件的时候，一起和iview、ant Design的button组件比
> 较功能、样式、代码结构，看他们的一些不同点，不同的写法哪种会好些，button的对外开放的功能那些会
> 用到哪些会相对比较好。
我们先来看这三个UI的button对外开放的功能结构：
- elementUI button:
![](https://images2018.cnblogs.com/blog/960483/201808/960483-20180823104556527-1084227676.png)


- iview button:
![](https://images2018.cnblogs.com/blog/960483/201808/960483-20180823104305007-470375001.png)


- ant Design button:
![](https://images2018.cnblogs.com/blog/960483/201808/960483-20180823103817186-2082693792.png)

可以看出iview和ant Desgin的button的功能很像，而element的button的功能少了个a标签的功能，感觉button转换a标签的功能用到的不多。后面看具体button样式代码会发现iview和ant Desgin更像，所有之前有看到说iview抄袭element感觉只是无中生有，那iview和ant Desgin到底是谁借鉴谁的也没必要深究，本身开源项目借鉴代码风格规范是很正常的，在加上一个常用组件常用功能翻来覆去就那些固定的。

三个UI的button样式结构：
- elementUI button.scss
![](https://images2018.cnblogs.com/blog/960483/201808/960483-20180823110618146-527207077.png)

- iview button.less
![](https://images2018.cnblogs.com/blog/960483/201808/960483-20180823110849250-1791853953.png)

- ant Desgin button.less
![](https://images2018.cnblogs.com/blog/960483/201808/960483-20180823111130151-826251262.png)

我可以看到iview和ant Desgin的button的样式都是用less而且结构包括mixins和button、命名都非常相似，elementUI的button样式用sass来写的。后续计划解析组件分elementUI、iview、ant Desgin的整体功能、样式结构篇；elementUI、iview、ant Desgin的样式详细篇；elementUI、iview、ant Desgin的功能代码详细篇三部分入手。这篇就介绍button在三大UI框架的功能、样式整天结构。下一片就是看三大UI框架样式详细篇。


