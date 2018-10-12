import React from 'react';
import classnames from 'classnames';
import {
	DragSource,
	DropTarget,
} from 'react-dnd';

import styles from "../css/index.less";

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.findCard(props.id).index,
		}
	},

	endDrag(props, monitor) {
		const {
			id,
			index
		} = monitor.getItem()
		const didDrop = monitor.didDrop();
		if (!didDrop) {
			props.moveCard(id, index)
		}
	},
}

const cardTarget = {
	canDrop() {
		return false
	},

	hover(props, monitor) {
		const {
			id: draggedId
		} = monitor.getItem()
		const {
			id: overId
		} = props

		if (draggedId !== overId) {
			const {
				index: overIndex
			} = props.findCard(overId)
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

		const cls = classnames(styles.item, {
			[styles.isDragging]: isDragging,
		})

		return (
			connectDragSource(
				connectDropTarget(
					<div className={cls}> {text} </div>
				)
			)
		)
	}
}