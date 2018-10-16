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
    const LEFT = lists[0];
    const RIGHT = lists[1];
    const dragList = lists.find(list => list.id === dragListId);
    const dragCard = dragList.data.find(card => card.id === dragId);

    const hoverList = lists.find(list => list.id === hoverListId);


    console.log(dragList, hoverList);

		if (hoverListId === dragListId) { 	// 同容器间拖拽
      // this.setState({
      //   lists: [
      //     {
      //       id: dragListId,
      //       data: update(dragList.data, {
      //         $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
      //       }),
      //     },
      //     RIGHT
      //   ]
      // })
		} else { // 跨容器间拖拽
			console.log('跨容器');
		}


  }

  render() {
		const { lists } = this.state;
		return (
			<div className={styles.container}>
				{
					lists.map((list, index) => {
						return(
							<List
                index={index}
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
