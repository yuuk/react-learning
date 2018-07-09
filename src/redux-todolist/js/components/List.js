import React from 'react';
import Todo from './Todo'

const List = ({todos, onTodoClick}) => {
    return (
        <ul>
            {
                todos.map((todo) => {
                    return (<Todo {...todo} key={todo.id} onClick={() => {onTodoClick(todo.id)}} />)
                })
            }
        </ul>
    )
}

export default List