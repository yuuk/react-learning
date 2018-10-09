import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button } from 'antd';
import Tab from './Tab';
import Pane from './Pane';
import styles from "../css/index.less";

class App extends Component {

  handleChange = (id) => {
    console.log(id);
  }
  
  render() {
    return (
      <div>
        <Tab onChange={this.handleChange}>
          <Pane id="0" title="选项卡1">
            <div className={styles.content}>我是第1个</div>
          </Pane>
          <Pane id="1" title="选项卡2">
            <div className={styles.content}>我是第2个</div>
          </Pane>
        </Tab>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
