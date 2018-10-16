import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';
import styles from "../css/index.less";

@DragDropContext(HTML5Backend)
class App extends Component {

	state = {
		listOne: [
			{ id: 1, text: "Item 1" },
			{ id: 2, text: "Item 2" },
			{ id: 3, text: "Item 3" }
		],
		listTwo: [
			{ id: 4, text: "Item 4" },
			{ id: 5, text: "Item 5" },
			{ id: 6, text: "Item 6" }
		],
	}

  render() {
		const { listOne, listTwo } = this.state;
		return (
			<div className={styles.container}>
				<List id="left" data={listOne} />
				<List id="right" data={listTwo} />
			</div>
		)
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
