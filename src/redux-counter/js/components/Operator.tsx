import React from 'react';
import { Button } from 'antd';

const Operator = ({ increment, decrement, asyncIncrement }) => {
    return (
        <div>
            <Button type="primary" onClick={decrement}>减</Button>
            <Button type="primary" onClick={increment}>加</Button>
            <Button type="primary" onClick={asyncIncrement}>异步增加</Button>
        </div>
    )
}

export default Operator;