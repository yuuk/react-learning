import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Operator from '../components/Operator';
import * as actions from '../actions/';

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        increment() {
            dispatch(actions.increment(1));
        },
        decrement() {
            dispatch(actions.decrement(2));
        },
        asyncIncrement() {
            dispatch(actions.asyncIncrement(3));
        },
    };
};

const myOperator = connect(mapStateToProps, mapDispatchToProps)(Operator);

export default myOperator;
