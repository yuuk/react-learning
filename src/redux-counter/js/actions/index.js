export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const increment = (payload) => {
    return {
        type: INCREMENT_COUNTER,
        payload
    };
}

export const decrement = (payload) => {
    return {
        type: DECREMENT_COUNTER,
        payload
    };
}

export const asyncIncrement = (delay=1000) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment());
        }, delay);
    };
}