import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../css/Drag.less';


let dragSrcEl = null;

class Drag extends Component {

  state = {
    dragging: false,
    dragOver: false,
  }

  onDragStart = (e) => {
    const { target } = e;

    this.setState({
      dragging: true,
    });
    dragSrcEl = target;
    e.dataTransfer.setData('text/html', target.innerHTML);
  }

  onDragEnter = (e) => {
    this.setState({
      dragOver: true,
    });
  }

  onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  onDragLeave = (e) => {
    this.setState({
      dragOver: false,
    });
  }

  onDragEnd = (e) => {
    this.setState({
      dragging: false,
      dragOver: false,
    });
  }

  onDrop = (e) => {
    e.preventDefault();
    const { target } = e;
    if (dragSrcEl !== target) {
      dragSrcEl.innerHTML = target.innerHTML;
      target.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }

  render() {
    const { dragging, dragOver } = this.state;
    const { children, className, ...rest } = this.props;

    const cls = classNames({
      className,
      [styles.dragItem]: true,
      [styles.dragging]: dragging,
      [styles.dragOver]: dragOver,
    })

    return (
      <div
        {...rest}
        draggable
        onDrop={this.onDrop}
        onDragEnd={this.onDragEnd}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDragStart={this.onDragStart}
        onDragEnter={this.onDragEnter}
        className={cls}
      >
        {children}
      </div>
    );
  }
}

export default Drag;
