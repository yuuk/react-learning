import '../css/index.less'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Input, List, Icon, Checkbox, Radio, Popconfirm } from 'antd';
const RadioGroup = Radio.Group;

const TYPES = {
    ALL: 'all',
    ACTIVE: 'active',
    DONE: 'done'
}

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentType: TYPES.ALL, // 默认类型
            todoInput: '',
            list: [{
                title: 'default todo',
                status: true,
                key: Date.now()
            }]
        }
    }
    //  输入控制
    handleEnter (value) {
        if (value) {
            this.state.list.push({
                title: value,
                status: false,
                key: Date.now()
            });
            this.setState({
                list: this.state.list,
                todoInput: ''
            });
        }
    }
    // 输入绑定
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
    // 分类筛选
    handleTypeChange (e) {
        this.setState({
            currentType: e.target.value
        });
    }
    render () {
        let state = this.state;
        let typeRadios = [];
        let type = state.currentType;
        for (let val of Object.keys(TYPES)) {
            typeRadios.push(<Radio key={ Math.random() } value={ TYPES[val] }>{ TYPES[val] }</Radio>);
        }
        // 筛选类型
        const filterList = state.list.filter(todo => {
            if (type == TYPES.ACTIVE) {
                return !todo.status;
            }
            if (type == TYPES.DONE) {
                return todo.status;
            }
            return todo;
        });
        return (
            <div className="todo-list">
                <Input.Search
                    placeholder="What needs to be done?"
                    value={ state.todoInput }
                    onChange={ this.handleInput.bind(this) }
                    onSearch={ this.handleEnter.bind(this) }
                    enterButton="确定"
                />
                <List
                    style={{ marginTop: '10px' }}
                    bordered
                    size="small"
                    header={
                        <div>
                            <div style={{ float: 'right' }}>
                                <RadioGroup onChange={ (e) => { this.handleTypeChange(e)} } name="todo-status" defaultValue={ state.currentType }>
                                    {typeRadios}
                                </RadioGroup>
                            </div>
                            <div>待办事项</div>
                        </div>
                    }
                    footer={<div>{ state.list.length } item total</div>}
                    dataSource={ filterList }
                    renderItem={(item, index) => (
                        <List.Item actions={[
                            <Popconfirm title="Sure to delete this todo?" onConfirm={ () => { this.handleDelete(index, item) } } okText="Yes" cancelText="No">
                                <Icon type="delete"/>
                            </Popconfirm>
                        ]}>
                            <List.Item.Meta
                                className={ item.status && 'done' }
                                title={<Checkbox 
                                    onChange={ (e) => {this.handleDone(e, index ,item)} }
                                    checked={ item.status }
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
