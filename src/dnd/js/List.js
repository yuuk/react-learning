import React from "react";
import classnames from "classnames";
import { DropTarget } from "react-dnd";
import update from 'immutability-helper';
import Card from "./Card";
import styles from "../css/index.less";

const cardTarget = {
	hover(props, monitor, component ) {
	
	}
}

@DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))
class List extends React.Component {

	state={
		data: this.props.data,
	}

	moveCard = (
		dragIndex,
		hoverIndex,
		dragId,
		hoverId,
		dragListId,
    hoverListId,
	) => {
		const { data } = this.state;

		const dragCard = data.find(card => card.id === dragId);
		const hoverCard = data.find(card => card.id === hoverId);

		if (dragListId === hoverListId) { 
			console.log('same container');
			this.setState(update(this.state, {
				data: {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragCard]
					]
				}
			}));
		} else {
			console.log('cross container');
		}
  }

  render() {

		const { data } = this.state;

    const {
			listId,
			canDrop,
			isOver,
      connectDropTarget
		} = this.props;

		const cls = classnames(styles.list, {
			[styles.listActive]: canDrop && isOver,
		})

    return (
      connectDropTarget(
				<div className={cls}>
					{data.map((card, index) => {
						if (card) {
							return (
								<Card
									key={card.id}
									index={index}
									card={card}
									listId={listId}
									moveCard={this.moveCard}
								/>
							)
						}
					})}
				</div>
      )
    );
  }
}


export default List;
