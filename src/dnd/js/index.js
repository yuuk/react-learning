import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext  } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import List from './List';
import styles from '../css/index.less';


@DragDropContext(HTML5Backend)
class App extends Component {

  state={
    list1: [{
      id: 1,
      content: '2018中国500强'
    },{
      id: 2,
      content: '夺冠后连夜返京'
    },{
      id: 3,
      content: '森碟清华留影'
    },{
      id: 4,
      content: '霍格沃茨开学'
    },{
      id: 5,
      content: '朱婷砸得地板疼'
    }],

    list2: [{
      id: 6,
      content: '教育部开学第一课'
    },{
      id: 7,
      content: '多国联军误炸客车'
    },{
      id: 8,
      content: 'ofo回应收购'
    },{
      id: 9,
      content: '亚运闭幕旗手郭丹'
    },{
      id: 10,
      content: '于海明属正当防卫'
    }]
  }

  moveCard = (dragIndex, hoverIndex, dragType, hoverType) => {
    
    const { list1, list2 } = this.state;
    const list = hoverType === 'list1' ? list1 : list2;

    const dragItem = list[dragIndex];
    const hoverItem = list[hoverIndex];

    if (dragType === hoverType) { // 当前列表拖拽
      list.splice(hoverIndex, 1, dragItem);
      list[dragIndex] = hoverItem;
      this.setState({
        [hoverType]: [...list]
      });
    } else { // 跨列表拖拽
      list
    }

    console.log(dragIndex, hoverIndex, dragType, hoverType);
  }
  
  render() {
    const { list1, list2 } = this.state;
    return (
      <div className={styles.container}>
        <List data={list1} />
        <List data={list2} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);