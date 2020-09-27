import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button } from 'antd';
import Upload from './Upload';
import styles from "../css/index.less";

class App extends Component {

  handleChange = (files) => {
    console.log(files);
  }
  
  render() {
    return (
      <div>
        <Upload
          maxFile={3}
          maxSize={1024 * 1000 * 1}
          onChange={this.handleChange}
          defaultValue={[
            {
              fileId: "027275b0-c47a-11e8-8af7-2f173f4bf53e",
              filename: "react.pptx",
              filepath: "uploads/react.pptx"
            }
          ]}
        >
          {(loading) => {
            return (
              <Button type="primary" loading={loading} className={styles.btn}>{loading ? '正在上传' : '+ 添加附件'}</Button>
            )
          }}
        </Upload>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
