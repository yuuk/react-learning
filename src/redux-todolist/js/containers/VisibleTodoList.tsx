import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions/';
import List from '../components/List';

const getVisibileTodos = (todos: any, filter: any) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_DONE':
            return todos.filter((item: any) => item.done);
        case 'SHOW_ACTIVE':
            return todos.filter((item: any) => !item.done);
        default:
            return todos;
    }
};

const mapStateToProps = (state: any) => {
    return {
        todos: getVisibileTodos(state.todos, state.visibilityFilter),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTodoClick: (id: any) => {
            dispatch(toggleTodo(id));
        },
    };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(List);

export default VisibleTodoList;
