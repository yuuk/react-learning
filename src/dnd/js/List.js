import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import {
  DropTarget,
} from 'react-dnd';
import ItemTypes from './ItemTypes';
import Item from './Item';
import styles from '../css/index.less';


const specTarget = {
  hover(props, monitor, component) {
		if (!component) {
			return null
    }
    const dragType = monitor.getItem().type;
    const dragIndex = monitor.getItem().index;

    const hoverIndex = props.index;
    const hoverType = props.type;
		if (dragIndex === hoverIndex) {
			return
		}
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		const clientOffset = monitor.getClientOffset()
		const hoverClientY = clientOffset.y - hoverBoundingRect.top
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}
    // props.moveCard(dragIndex, hoverIndex, dragType, hoverType);
		monitor.getItem().index = hoverIndex
  },
}

@DropTarget(ItemTypes.BOX, specTarget, (connectDragSource, monitor) => ({
  connectDropTarget: connectDragSource.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
}))
class List extends Component {
  render() {
    const {
      canDrop,
      isOver,
      connectDropTarget,
      data,
    } = this.props;

    return (
      connectDropTarget(
        <div className={styles.list}>
          {data.map((item, i) => (
            <Item
              key={item.id}
              id={item.id}
              index={i}
            >
              {item.content}
            </Item>
          ))}
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

export default List;