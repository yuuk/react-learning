import React from 'react';
const Todo = ({onClick, text, done}) => {
    return (
        <li 
            onClick={onClick}
            style={{textDecoration: done ? 'line-through' : 'none'}}
        >{text}</li>
    )
}
export default Todo