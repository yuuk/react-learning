import React from 'react';
import { connect } from 'react-redux'
import { toggleTodo } from '../actions/'
import List from '../components/List'

const getVisibileTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_DONE':
            return todos.filter(item => item.done)
        case 'SHOW_ACTIVE':
            return todos.filter(item => !item.done)
        default:
            return todos
    }
}

const mapStateToProps = (state) => {
    return {
        todos: getVisibileTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default VisibleTodoList;