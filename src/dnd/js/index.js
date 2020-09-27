import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';
import styles from "../css/index.less";

const deepFlatten = arr => {
	return [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));
}

const data = [
	{
			"id":"d459b357-9c1c-4e25-8c8b-b92687611a74",
			"name":"Todo",
			"notes":[
					"1c3bda94-1ea8-4056-8e87-c1ee06fff7e7",
					"43c5c463-bfad-448a-b91a-ab980fb0d889"
			]
	},
	{
			"id":"f2b0552d-4384-4a69-8081-20243ef4e400",
			"name":"In Progress",
			"notes":[
					"d618175c-134e-4adf-8042-3d1bba5f8412",
					"f634a4e2-aa17-47cf-975e-ccb08e77cf3b",
					"ab49dec3-5e0a-4531-a705-4b0a8a6fb654",
					"5ef893e1-8328-4aa4-b702-714cf68a77cf"
			]
	}
]

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
							/>
						)
					})
				}
			</div>
		)
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// http://rafaelquintanilha.com/sortable-targets-with-react-dnd/