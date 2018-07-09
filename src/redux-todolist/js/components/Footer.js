import React from 'react';
import FilterLink from '../containers/FilterLink'

const Footer = () => {
    return (
        <p>
            show：
            <FilterLink filter="SHOW_ALL">All</FilterLink>
            {' '}
            <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
            {' '}
            <FilterLink filter="SHOW_DONE">Done</FilterLink>
        </p>
    )
}

export default Footer