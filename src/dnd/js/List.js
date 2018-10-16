import React from "react";
import classnames from "classnames";
import { DropTarget } from "react-dnd";
import Card from "./Card";
import styles from "../css/index.less";

const cardTarget = {
	drop(props, monitor, component ) {
		const { id: listId, index } = props;
		return {
      index,
			listId
		};
	}
}

@DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))
class List extends React.Component {

  render() {
    const {
      index,
			id,
			data,
			moveCard,
			exchangeCard,

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
						return (
							<Card
								key={card.id}
								index={index}
								card={card}
                listId={id}
								moveCard={moveCard}
								exchangeCard={exchangeCard}
							/>
						)
					})}
				</div>
      )
    );
  }
}


export default List;
