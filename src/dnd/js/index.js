import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import List from './List';
import styles from "../css/index.less";

@DragDropContext(HTML5Backend)
class App extends Component {

	state = {
		lists: [{
			id: 'left',
			data: [
				{ id: 1, text: "Item 1" },
				{ id: 2, text: "Item 2" },
				{ id: 3, text: "Item 3" }
			]
		}, {
			id: 'right',
			data: [
				{ id: 4, text: "Item 4" },
				{ id: 5, text: "Item 5" },
				{ id: 6, text: "Item 6" }
			]
		}]
	}
	
  moveCard = (
		dragIndex,
		hoverIndex,
		dragId,
		hoverId,
		dragListId,
		hoverListId,
	) => {
		const { lists } = this.state;
		const dragList = lists.find(list => list.id === dragListId);
		const dragCard = dragList.data[dragIndex];

		if (hoverListId === dragListId) { 	// 同容器间拖拽
			console.log('同容器');
		} else { // 跨容器间拖拽
			console.log('跨容器');
		}

		// this.setState(
    //   update(this.state, {
    //     lists: {
    //       $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
    //     }
    //   })
    // );
  }

  render() {
		const { lists } = this.state;
		return (
			<div className={styles.container}>
				{
					lists.map(list => {
						return(
							<List
								key={list.id}
								id={list.id}
								data={list.data}
								moveCard={this.moveCard}
							/>
						)
					})
				}
			</div>
		)
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
