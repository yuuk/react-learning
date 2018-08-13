import React, { Component } from 'react';
import classNames from 'classnames';
import {
  DropTarget,
} from 'react-dnd';
import ItemTypes from './ItemTypes';

import styles from '../css/index.less';

const boxTarget = {
  drop(props) {
    console.log(props);
    return { name: 'Dustbin' }
  },
}

class Area extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    const cls = classNames({
      [styles.area]: true,
      [styles.active]: isActive,
      [styles.canDrop]: canDrop,
    });

    return (
      connectDropTarget && connectDropTarget(
        <div className={cls}>
          {isActive ? 'Release to drop' : 'Drag an item here'}
        </div>,
      )
    )
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(Area);;