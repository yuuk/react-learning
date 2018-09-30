import React, { Component, Children } from "react";
import PropTypes from 'prop-types';
import styles from "../css/index.less";


class Tab extends Component {

	
	state = {
    activeTab: 0,
  };
  
  onChange = (props) => {
    const { tabid } = props;
    this.setState({
      activeTab: tabid,
    })
  }

	

  render() {
    const { activeTab } = this.state;

    console.log(activeTab)

    return (
			<div className={styles.tabs}>
        <div className={styles.tabHeader}>
        {
            Children.map(this.props.children, (children) =>
              <div
                className={styles.tabHeaderItem}
                onClick={e => this.onChange(children.props)}
              >
                {children.props.title}
              </div>
            )
        }

        </div>
        <div className={styles.tabBody}>
          {
            Children.map(this.props.children, (children) => {
              if (activeTab == children.props.tabid ){
                return children;
              }
            })
          } 
        </div>
      </div>
    );
  }
}

export default Tab;
