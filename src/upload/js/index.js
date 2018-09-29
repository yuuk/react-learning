import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button } from 'antd';
import Upload from './Upload';
import styles from "../css/index.less";

class App extends Component {
  render() {
    return (
      <div>
        <Upload maxFile="3" maxSize={1024 * 1000 * 1} accept=".png">
          {(loading) => {
            return (
              <Button loading={loading} className={styles.btn}>{loading ? '正在上传' : '+ 添加附件'}</Button>
            )
          }}
        </Upload>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
