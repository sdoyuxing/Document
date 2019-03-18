最近更新有点慢，更新慢的原因最近在看

- 《css世界》这本书，感觉很不错

![](https://pic1.zhimg.com/80/v2-96058d5a29a1a4a69de40ee2b7315af8_hd.jpg)

- 《JavaScript高级程序设计》 这本书已经看了很多遍了，主要是复习前端的基础知识，基础知识经常会过一段时间记忆就会慢慢模糊，特别是现在用vue、react、angularjs已经很少用原生js了，对dom的原生api方法已经忘记很多了。

![](https://pic3.zhimg.com/80/v2-d3adfa516d382425e3f1b601873d3d92_hd.png)

- 《梦的解析》--弗洛伊德，看这本书主要是自己的兴趣爱好，里面的内容有点难度，想通过心理学改变自己，做更好更真实的自己。

![](https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=fd5dd8bae124b899de3c7e3e563d7aa8/0823dd54564e9258046c74549482d158ccbf4e34.jpg)

> 题外话说完了，这篇主要是针对上一篇对ant of react的代码解析只是加了注释反应很难懂，没有那么时间去一个一个仔细看。后面ant发布了新版本在button组件上对动画效果做了一些处理，大概的逻辑结构没变。这篇就用思维导图来展示下ant of react button组件js代码的逻辑结构，画的不好敬请谅解。

#### 结构主线
按钮的代码逻辑结构的主线其实就是围绕按钮对外开放的功能实现的，所有我想来看看ant desgin of ract 按钮组件对外开放的功能导图：

![](https://pic2.zhimg.com/80/v2-021d0f51338c7da9f797de5df7f64695_hd.jpg)

- disabled	按钮失效状态

- ghost	幽灵属性

- href	点击跳转的地址，指定此属性 button 的行为和 a 链接一致

- htmlType	设置 button 原生的 type 值，可选值请参考 HTML 标准

- icon	设置按钮的图标类型

- loading	设置按钮载入状态

- shape	设置按钮形状

- size	设置按钮大小

- target	相当于 a 链接的 target 属性，href 存在时生效

- type	设置按钮类型，可选值为 primary dashed danger(版本 2.7 中增加) 或者不设

- onClick	点击按钮时的回调

- block	将按钮宽度调整为其父宽度的选项


其中导致组件html结构不一样的是href功能，所以先看href的实现
```javascript
   /**
   * 组件内容
   */
  render() {
    const {
      type, shape, size, className, children, icon, prefixCls, ghost, loading: _loadingProp, block, ...rest
    } = this.props;

    const { loading, hasTwoCNChar } = this.state;

    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
      default:
        break;
    }

    const now = new Date();
    const isChristmas = now.getMonth() === 11 && now.getDate() === 25;
    /**
     * 拼接className
     */
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,//对应type功能
      [`${prefixCls}-${shape}`]: shape,//对应shape功能
      [`${prefixCls}-${sizeCls}`]: sizeCls,//对应size功能
      [`${prefixCls}-icon-only`]: !children && icon,//对应icon功能
      [`${prefixCls}-loading`]: loading,//对应loading功能
      [`${prefixCls}-background-ghost`]: ghost,//对应ghost功能
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar,
      [`${prefixCls}-block`]: block,//对应block功能
      christmas: isChristmas,
    });
    /**
       * 设置图标
       */
    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? <Icon type={iconType} /> : null;
    const kids = (children || children === 0)
      ? React.Children.map(children, child => insertSpace(child, this.isNeedInserted())) : null;

    const title = isChristmas ? 'Ho Ho Ho!' : rest.title;
    /**
        * 判断是a标签还是button标签，对应href功能
        */
    if ('href' in rest) {
      return (
        <a
          {...rest}
          className={classes}
          onClick={this.handleClick}
          title={title}
        >
          {iconNode}{kids}
        </a>
      );
    } else {
      // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
      const { htmlType, ...otherProps } = rest;

      return (
        <Wave>
          <button
            {...otherProps}
            type={htmlType || 'button'}
            className={classes}
            onClick={this.handleClick}
            title={title}
          >
            {iconNode}{kids}
          </button>
        </Wave>
      );
    }
  }
```
上面的那些功能配置属性是通过父组件通过props传递进来的，那组件代码中要有接收参数已经检验参数类型的处理块：
```javascript
/**
 * 类型别名,这个类型的只能是对应的值
 */
export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';
/**
 * 声明一个接口BaseButtonProps 
 */
export interface BaseButtonProps {
  type?: ButtonType;
  icon?: string;
  shape?: ButtonShape;
  size?: ButtonSize;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}
/**
 * a标签的参数组合
 */
export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
/**
 * button标签的参数组合
 */
export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
/**
 * 类型别名
 */
export type ButtonProps = AnchorButtonProps | NativeButtonProps;
/**
 * button class声明
 */
export default class Button extends React.Component<ButtonProps, any> {
  static Group: typeof Group;
  static __ANT_BUTTON = true;
  /**
   * 设置props默认值
   */
  static defaultProps = {
    prefixCls: 'ant-btn',
    loading: false,
    ghost: false,
    block: false,
  };
  /**
    * props类型校验
    */
  static propTypes = {
    type: PropTypes.string,
    shape: PropTypes.oneOf(['circle', 'circle-outline']),
    size: PropTypes.oneOf(['large', 'default', 'small']),
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: PropTypes.func,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    className: PropTypes.string,
    icon: PropTypes.string,
    block: PropTypes.bool,
  };
```
这段代码大概意思是在typescript中声明接口和自定义类型来校验参数对象里面的键值对的数据类型，defaultProps设置参数的某些默认值，propTypes在react中通过prop-types来校验参数的数据量类型和值。


剩下就是单击事件和组件声明周期的一些处理事件
- 组件的构造函数 声明state的值
```javascript
  /**
   * 构造函数
   */
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      loading: props.loading,
      hasTwoCNChar: false,
    };
  }
```
- 单击事件，如果是加载状态不触发单击事件
```javascript
  /**
    * 单击事件
    */
  handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    const { loading } = this.state;
    const { onClick } = this.props;
    if (!!loading) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  }
```
- 组件的生命周期处理
```javascript
 /**
     * 组件渲染之后调用，只调用一次。
     */
  componentDidMount() {
    this.fixTwoCNChar();
  }
  /**
    * props改变时调用触发，nextProps.loading赋值到setState的loading
    * @param nextProps 
    */
  componentWillReceiveProps(nextProps: ButtonProps) {
    const currentLoading = this.props.loading;
    const loading = nextProps.loading;

    if (currentLoading) {
      clearTimeout(this.delayTimeout);
    }

    if (typeof loading !== 'boolean' && loading && loading.delay) {
      this.delayTimeout = window.setTimeout(() => this.setState({ loading }), loading.delay);
    } else {
      this.setState({ loading });
    }
  }
  /**
    * 组件更新完成后调用
    */
  componentDidUpdate() {
    this.fixTwoCNChar();
  }
  /**
   * 组件将要卸载时调用,清除定时器
   */
  componentWillUnmount() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }
  /**
    * 判断botton的内容是否有两个中文字
    */
  fixTwoCNChar() {
    // Fix for HOC usage like <FormatMessage />
    const node = (findDOMNode(this) as HTMLElement);
    const buttonText = node.textContent || node.innerText;
    if (this.isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!this.state.hasTwoCNChar) {
        this.setState({
          hasTwoCNChar: true,
        });
      }
    } else if (this.state.hasTwoCNChar) {
      this.setState({
        hasTwoCNChar: false,
      });
    }
  }
  /**
 * 判断是否是字符串类型
 */
function isString(str: any) {
  return typeof str === 'string';
}
/**
 * 多个中文间插入空格
 * @param {Object} child 组件的子内容
 * @param {Boolean} needInserted 是否插入空格
 * @returns {ReactElement} 
 */
// Insert one space between two chinese characters automatically.
function insertSpace(child: React.ReactChild, needInserted: boolean) {
  // Check the child if is undefined or null.
  if (child == null) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  // strictNullChecks oops.
  if (typeof child !== 'string' && typeof child !== 'number' &&
    isString(child.type) && isTwoCNChar(child.props.children)) {
    return React.cloneElement(child, {},
      child.props.children.split('').join(SPACE));
  }
  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      child = child.split('').join(SPACE);
    }
    return <span>{child}</span>;
  }
  return child;
}
```