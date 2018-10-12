import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DropTarget, DragDropContext, ConnectDropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import Card from './Card';
import styles from "../css/index.less";

const cardTarget = {
	drop() {
		//
	},
}

@DragDropContext(HTML5Backend)
@DropTarget('CARD', cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))

class App extends Component {

  state={
    listOne: [{
      id: 1,
      content: 'item one'
    }, {
      id: 2,
      content: 'item two'
    }, {
      id: 3,
      content: 'item three'
    }],
  }

  moveCard = (id, atIndex) => {
		const { card, index } = this.findCard(id);
		console.log(index); // source index
		this.setState(
			update(this.state, {
				listOne: {
					$splice: [[index, 1], [atIndex, 0, card]],
				},
			}),
		)

		console.table(this.state.listOne);
	}

	findCard = (id) => {
		const { listOne } = this.state;
		const card = listOne.find(item => item.id === id);
		const index = listOne.findIndex(item => item.id === id);
		return {
			card,
			index,
		}
	}

  render() {
    const { connectDropTarget } = this.props
		const { listOne } = this.state
		return (
			connectDropTarget &&
			connectDropTarget(
				<div className={styles.container}>
					{listOne.map(card => (
						<Card
							key={card.id}
							id={card.id}
              text={card.content}
              moveCard={this.moveCard}
							findCard={this.findCard}
						/>
					))}
				</div>,
			)
		)
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
