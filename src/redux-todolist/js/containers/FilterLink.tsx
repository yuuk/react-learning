import React from 'react';
import { connect } from 'react-redux';
import Link from '../components/Link';
import { setVisibility } from '../actions/';

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        active: ownProps.filter === state.visibilityFilter,
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        onClick: () => {
            dispatch(setVisibility(ownProps.filter));
        },
    };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
