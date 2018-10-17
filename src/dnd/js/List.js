import React from "react";
import classnames from "classnames";
import { DropTarget } from "react-dnd";
import Card from "./Card";
import styles from "../css/index.less";

const cardTarget = {
	hover(props, monitor, component ) {
		const { listId, index } = props;
		console.log(props, monitor.getItem());
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
		const { allData } = this.props;

		const dragCard = allData.find(card => card.id === dragId);
		const hoverCard = allData.find(card => card.id === hoverId);

		if (hoverListId === dragListId) { 
			console.log('同容器拖拽');

			const newData = [...data];
			newData.splice(hoverIndex, 1, dragCard);
			newData.splice(dragIndex, 1, hoverCard);

			this.setState({
				data: [...newData],
			});
		} else {
			console.log('跨容器拖拽');
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
