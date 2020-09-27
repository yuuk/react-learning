import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/';

const counter = (state = 0, action) => {
    console.log(action)
    switch(action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        case DECREMENT_COUNTER:
            return state - 1;
        default:
            return state;
    }
};

export default counter;