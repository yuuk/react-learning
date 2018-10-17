import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';
import styles from "../css/index.less";

const deepFlatten = arr => {
	return [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));
}

@DragDropContext(HTML5Backend)
class App extends Component {

	state = {
		lists: [[
			{ id: 1, text: "Item 1" },
			{ id: 2, text: "Item 2" },
			{ id: 3, text: "Item 3" }
		],[
			{ id: 4, text: "Item 4" },
			{ id: 5, text: "Item 5" },
			{ id: 6, text: "Item 6" }
		]]
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
								key={index}
								listId={index}
								data={list}
								allData={deepFlatten(lists)}
							/>
						)
					})
				}
			</div>
		)
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
