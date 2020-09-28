let nextTodoId = 0;

export const addTodo = (text: string) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text,
    };
};

export const setVisibility = (filter: any) => {
    return {
        type: 'SET_VISIBILITY',
        filter,
    };
};

export const toggleTodo = (id: any) => {
    return {
        type: 'TOGGLE_TODO',
        id,
    };
};
