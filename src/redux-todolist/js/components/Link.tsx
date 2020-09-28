import React from 'react';
const Link = ({ active, children, onClick }: any) => {
    if (active) {
        return <span>{children}</span>;
    }
    return (
        <a href="javascript:;" onClick={onClick}>
            {children}
        </a>
    );
};

export default Link;
