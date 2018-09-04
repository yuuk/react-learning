import React, { Component } from 'react';
import classNames from 'classnames';

import {
  DragSource,
  DropTarget,
} from 'react-dnd';
import ItemTypes from './ItemTypes';

import styles from '../css/index.less';

const specSource = {
  beginDrag(props) {
    return props;
  },
};

const specTarget = {
  hover(targetProps, monitor, component) {

    const targetData = targetProps.data || {};
    const targetIndex = targetProps.index;

    const sourceProps = monitor.getItem();
    const sourceData = sourceProps.data || {};
    const sourceIndex = sourceProps.index;

    if(targetData.id !== sourceData.id ) {
      targetProps.moveItem({
        targetProps,
        sourceProps,
      });
    }
  },
}

@DropTarget(ItemTypes.BOX, specTarget, (connectDragSource, monitor) => ({
  connectDropTarget: connectDragSource.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
}))
@DragSource(ItemTypes.BOX, specSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Box extends Component {
  render() {
    const { 
      isDragging,
      canDrop,
      isOver,
      connectDropTarget,
      connectDragSource,
      data
    } = this.props

    const isActive = canDrop && isOver;

    const cls = classNames({
      [styles.item]: true,
      [styles.dragging]: isDragging,
    });

    return connectDropTarget(
      connectDragSource(
        <div className={cls}>{data.content}</div>
      )
    )
  }
}

export default Box;