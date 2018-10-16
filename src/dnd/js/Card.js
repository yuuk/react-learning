import React from "react";
import { findDOMNode } from 'react-dom';
import classnames from "classnames";
import { DragSource, DropTarget } from "react-dnd";

import styles from "../css/index.less";

const cardSource = {
 
	beginDrag(props) {		
		return {			
			index: props.index,
			listId: props.listId,
			card: props.card
		};
	},

	isDragging(props, monitor) {
    return props.card.id === monitor.getItem().card.id;
  },
};

const cardTarget = {
	hover(props, monitor, component) {

		const dragIndex = monitor.getItem().index;
		const dragId = monitor.getItem().card.id;

		const hoverIndex = props.index;
		const hoverId = props.card.id;

		const dragListId = monitor.getItem().listId;
		const hoverListId = props.listId;

		// 相同元素上拖拽不作处理
		if (dragId === hoverId) {
			return;
		}

		// console.log('hover:', props);
		// console.log('drag:', monitor.getItem());
 
		if ( hoverListId === dragListId ) { 	// 同容器间拖拽
			props.moveCard(dragIndex, hoverIndex, dragId, hoverId);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		} else { // 跨容器拖拽
			props.exchangeCard(
				dragIndex,
				hoverIndex,
				dragId,
				hoverId,
				dragListId,
				hoverListId,
			);
		}
	}
};

@DropTarget("CARD", cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource("CARD", cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Card extends React.Component {
  render() {
    const {
      card,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;

    const cls = classnames(styles.item, {
      [styles.isDragging]: isDragging
    });

    return connectDragSource(
      connectDropTarget(<div className={cls}> {card.text} </div>)
    );
  }
}
