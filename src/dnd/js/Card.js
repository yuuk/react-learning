import React from "react";
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
		
		if (dragId === hoverId) {
			return;
		}

		props.moveCard(
			dragIndex,
			hoverIndex,
			dragId,
			hoverId,
			dragListId,
			hoverListId,
		);

		if (hoverListId === dragListId) { 
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
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
