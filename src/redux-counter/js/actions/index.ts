export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const ASYNC_INCREMENT_COUNTER = 'ASYNC_INCREMENT_COUNTER';

export const increment = (payload: any) => {
    return {
        type: INCREMENT_COUNTER,
        payload,
    };
};

export const asyncIncrement = (payload: any) => {
    return {
        type: ASYNC_INCREMENT_COUNTER,
        payload,
    };
};

export const decrement = (payload: any) => {
    return {
        type: DECREMENT_COUNTER,
        payload,
    };
};
