import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DropTarget, DragDropContext, ConnectDropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import styles from "../css/index.less";

const update = require('immutability-helper');

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
    items: [{
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
		const { card, index } = this.findCard(id)
		this.setState(
			update(this.state, {
				items: {
					$splice: [[index, 1], [atIndex, 0, card]],
				},
			}),
		)
	}

	findCard = (id) => {
		const { items } = this.state;
		const card = items.filter(c => c.id === id)[0];
		return {
			card,
			index: items.indexOf(card),
		}
	}

  render() {
    const { connectDropTarget } = this.props
		const { items } = this.state
		return (
			connectDropTarget &&
			connectDropTarget(
				<div className={styles.container}>
					{items.map(card => (
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
