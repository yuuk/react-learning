import React from 'react'
import {
	DragSource,
	DropTarget,
} from 'react-dnd';

import styles from "../css/index.less";

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			originalIndex: props.findCard(props.id).index,
		}
	},

	endDrag(props, monitor) {
		const {
			id: droppedId,
			originalIndex
		} = monitor.getItem()
		const didDrop = monitor.didDrop()

		if (!didDrop) {
			props.moveCard(droppedId, originalIndex)
		}
	},
}

const cardTarget = {
	canDrop() {
		return false
	},

	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem()
		const { id: overId } = props

		if (draggedId !== overId) {
			const { index: overIndex } = props.findCard(overId)
			props.moveCard(draggedId, overIndex)
		}
	},
}

@DropTarget('CARD', cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource('CARD', cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class Card extends React.Component {
	render() {
		const {
			text,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props

		const opacity = isDragging ? 0 : 1

		return (
			connectDragSource &&
			connectDropTarget &&
			connectDragSource(
				connectDropTarget(<div className={styles.item} style={{ opacity }}>{text}</div>),
			)
		)
	}
}