import React from "react";
import classnames from "classnames";
import { DropTarget } from "react-dnd";
import update from 'immutability-helper';
import Card from "./Card";
import styles from "../css/index.less";

const cardTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		return {
			listId: id
		};
	}
}

@DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))
class List extends React.Component {

	state = {
		cards: this.props.data,
	};

	exchangeCard = (
		dragIndex,
		hoverIndex,
		dragId,
		hoverId,
		dragListId,
		hoverListId,
	) => {
		const { cards } = this.state; // hoverCards
		console.log(dragListId, hoverListId);
	}

  removeCard = (index) => {
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[index, 1]]
        }
      })
    );
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
		const dragCard = cards[dragIndex];

		this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  }

  render() {

		const { cards } = this.state;

    const {
			id,
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
					{cards.map((card, index) => {
						return (
							<Card 
								key={card.id}
								index={index}
								card={card}
								listId={id}
								removeCard={this.removeCard}
								moveCard={this.moveCard}
								exchangeCard={this.exchangeCard}
							/>
						)
					})}
				</div>
      )
    );
  }
}


export default List; 