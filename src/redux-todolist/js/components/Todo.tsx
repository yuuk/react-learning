import React from 'react';
const Todo = ({ onClick, text, done }: any) => {
    return (
        <li onClick={onClick} style={{ textDecoration: done ? 'line-through' : 'none' }}>
            {text}
        </li>
    );
};
export default Todo;
