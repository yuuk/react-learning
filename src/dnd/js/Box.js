import React, { Component } from 'react';
import classNames from 'classnames';
import {
  DragSource,
} from 'react-dnd';
import ItemTypes from './ItemTypes';

import styles from '../css/index.less';

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const boxSource = {
  beginDrag(props) {
    console.log('begin dragging note', props);
    return {};
  },

  endDrag(props) {
    console.log(props);
    return {};
  },
};

class Box extends Component {
  render() {
    const { isDragging, connectDragSource, name } = this.props
    const cls = classNames({
      [styles.item]: true,
      [styles.dragging]: isDragging,
    });
    


    const opacity = isDragging ? 0.4 : 1

    return (
      connectDragSource &&
      connectDragSource(<div className={cls}>{name}</div>)
    )
  }
}

export default DragSource(ItemTypes.BOX, boxSource, collect)(Box);