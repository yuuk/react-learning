import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import * as Immutable from 'immutable';
import List from "./List";
import styles from "../css/index.less";



@DragDropContext(HTML5Backend)
class App extends Component {
  state = {
    lists: [
      [
        {
          id: 1,
          content: "2018中国500强"
        },
        {
          id: 2,
          content: "夺冠后连夜返京"
        },
        {
          id: 3,
          content: "森碟清华留影"
        },
        {
          id: 4,
          content: "霍格沃茨开学"
        },
        {
          id: 5,
          content: "朱婷砸得地板疼"
        }
      ],
      [
        {
          id: 6,
          content: "教育部开学第一课"
        },
        {
          id: 7,
          content: "多国联军误炸客车"
        },
        {
          id: 8,
          content: "ofo回应收购"
        },
        {
          id: 9,
          content: "亚运闭幕旗手郭丹"
        },
        {
          id: 10,
          content: "于海明属正当防卫"
        }
      ]
    ]
  };

  moveItem = ({ targetProps, sourceProps }) => {
    const { lists } = this.state;

    const ImmutableLists = Immutable.fromJS(lists);
    
    const targetIndex = targetProps.index;
    const targetData = targetProps.data;
    const targetListId = targetProps.listId;

    const sourceIndex = sourceProps.index;
    const sourceData = sourceProps.data;
    const sourceListId = sourceProps.listId;

    // 跨容器拖拽
    if (targetListId !== sourceListId) {
      return [];
    }

    const newLists = ImmutableLists.setIn([targetListId, targetIndex], sourceData).setIn([sourceListId, sourceIndex], targetData);


    this.setState({
      lists: newLists.toJS()
    })

  };

  render() {
    const { lists } = this.state;

    console.log(lists);
    
    return (
      <div className={styles.container}>
        {
          lists.map((list, i) => (
            <List key={i} listId={i} data={list} moveItem={this.moveItem} />
          ))
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
