import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Input, List, Icon, Checkbox, Popconfirm } from 'antd';
import '../css/index.less'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todoInput: '',
            list: [{
                title: 'default todo',
                status: 1,
                key: Date.now()
            }]
        }
    }
    handleEnter (value) {
        if (value) {
            this.state.list.push({
                title: value,
                status: 0,
                key: Date.now()
            });
            this.setState({
                list: this.state.list,
                todoInput: ''
            });
        }
    }
    handleInput (e) {
        this.setState({
            todoInput: e.target.value
        });
    }
    // 删除 todo
    handleDelete (index, item) {
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({ list: list });
    }
    // 标记完成
    handleDone (e, index, item) {
        let isChecked = e.target.checked;
        let list = this.state.list;
        list[index].status = isChecked;
        this.setState({ list: list });
    }
    render () {
        return (
            <div className="todo-list">
                <Input.Search
                    placeholder="What needs to be done?"
                    value={this.state.todoInput}
                    onChange={this.handleInput.bind(this)}
                    onSearch={this.handleEnter.bind(this)}
                    enterButton="确定"
                />
                <br/><br/>
                <List
                    header={<div>代办任务项</div>}
                    bordered
                    size="small"
                    dataSource={this.state.list}
                    renderItem={(item, index) => (
                        <List.Item actions={[
                            <Popconfirm title="Sure to delete this todo?" onConfirm={ () => { this.handleDelete(index, item) } } okText="Yes" cancelText="No">
                                <Icon type="delete"/>
                            </Popconfirm>
                        ]}>
                            <List.Item.Meta
                                className={ item.status == 1 && 'done' }
                                title={<Checkbox 
                                    onChange={ (e) => {this.handleDone(e, index ,item)} }
                                    checked={ item.status == 1 }
                                >{ item.title }</Checkbox>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));
