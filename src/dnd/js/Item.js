import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import classNames from 'classnames';
import {
  DragSource,
  DropTarget,
} from 'react-dnd';
import ItemTypes from './ItemTypes';

import styles from '../css/index.less';

const specSource = {
  beginDrag(props) {
    return {
			id: props.id,
      index: props.index,
      type: props.type,
		}
  },

  endDrag(props) {
    console.log('end', props);
    return {};
  },
};


@DragSource(ItemTypes.BOX, specSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Box extends Component {
  render() {
    const { 
      isDragging,
      connectDragSource,
      children
    } = this.props
    const cls = classNames({
      [styles.item]: true,
      [styles.dragging]: isDragging,
    });
  

    return connectDragSource(
        <div className={cls}>{children}</div>
      )
  }
}

export default Box;