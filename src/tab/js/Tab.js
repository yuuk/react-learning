import React, { Component, Children } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from "../css/index.less";

console.log(classnames);


class Tab extends Component {

  static propTypes = {
		defaultActiveTab: PropTypes.string, // 默认选中的 tab
		onChange: PropTypes.func,  // 文件变化回调函数
  };
  
  static defaultProps = {
		defaultActiveTab: undefined,
		onChange: () => {},
	}
	
	state = {
    activeTab: this.props.defaultActiveTab,
  };

  onChange = (props) => {
    const { id } = props;
    const { onChange } = this.props;
    this.setState({
      activeTab: id,
    });
    onChange(id);
  }

  render() {
    const { activeTab } = this.state;
    const { children } = this.props;
  
    // 高亮 tab
    const isActiveTab = (child, index) => {
      if (activeTab !== undefined && activeTab === child.props.id) {
        return true;
      }
      // 没有传递默认值，选中第一个 tab
      if(activeTab === undefined && index === 0) {
        return true;
      }
      return false;
    }

    return (
			<div className={styles.tabs}>
        <div className={styles.nav}>
          {
              Children.map(children, (child, index) =>
                <div
                  className={classnames(styles.navItem, {
                    [styles.active]: isActiveTab(child, index),
                  })}
                  onClick={e => this.onChange(child.props)}
                >
                  {child.props.title}
                </div>
              )
          }
        </div>
        <div className={styles.body}>
          {
            Children.map(children, (child, index) => {
              if (isActiveTab(child, index)) {
                return child;
              }
            })
          } 
        </div>
      </div>
    );
  }
}

export default Tab;
