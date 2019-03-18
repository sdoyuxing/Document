>这篇看ant Desgin of react的button按钮的js代码，js代码部分是typescript+react写的。

button组件里面引用了哪些组件：
```javascript
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import Group from './button-group';
```
- `React`、`react-dom`是react要引用的，这里不多解释。
- `prop-types`是用来检验传给组件props的类型，在props上运行类型检查，在下面代码中用到
- `className`是用来添加多个className

先看下整体代码：
```javascript
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import Group from './button-group';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
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
  };

  timeout: number;
  delayTimeout: number;
  /**
   * 构造函数
   */
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      loading: props.loading,
      clicked: false,
      hasTwoCNChar: false,
    };
  }
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
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
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
   * 单击事件
   */
  handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    // Add click effect
    this.setState({ clicked: true });
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => this.setState({ clicked: false }), 500);
    const onClick = this.props.onClick;
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  }
  /**
   * 判断子节点只有一个和是否图标
   */
  isNeedInserted() {
    const { icon, children } = this.props;
    return React.Children.count(children) === 1 && !icon;
  }
  /**
   * 组件内容
   */
  render() {
    const {
      type, shape, size, className, children, icon, prefixCls, ghost, loading: _loadingProp, ...rest
    } = this.props;

    const { loading, clicked, hasTwoCNChar } = this.state;

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
    /**
     * 拼接className
     */
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && icon,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-clicked`]: clicked,
      [`${prefixCls}-background-ghost`]: ghost,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar,
    });
    /**
     * 设置图标
     */
    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? <Icon type={iconType} /> : null;
    const kids = (children || children === 0)
      ? React.Children.map(children, child => insertSpace(child, this.isNeedInserted())) : null;
    /**
     * 判断是a标签还是button标签
     */
    if ('href' in rest) {
      return (
        <a
          {...rest}
          className={classes}
          onClick={this.handleClick}
        >
          {iconNode}{kids}
        </a>
      );
    } else {
      // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
      const { htmlType, ...otherProps } = rest;

      return (
        <button
          {...otherProps}
          type={htmlType || 'button'}
          className={classes}
          onClick={this.handleClick}
        >
          {iconNode}{kids}
        </button>
      );
    }
  }
}

```
因为按钮的逻辑没那么复杂，里面很多都是对外开放的弄能和样式的一些对应，所以就在代码上加了注释，能很快理解里面的代码