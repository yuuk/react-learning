import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button } from 'antd';
import Tab from './Tab';
import styles from "../css/index.less";

class App extends Component {
  
  render() {
    return (
      <div>
        <Tab activeTab="0">
          <div tabid="0" title={<Button>选项卡一</Button>}>
              <div><span>我是第一个</span></div>
          </div>
          <div tabid="1" title={<Button>选项卡二</Button>}>
              <div><span>我是第二个</span></div>
          </div>
        </Tab>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
