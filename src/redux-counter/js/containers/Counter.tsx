import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';

const mapStateToProps = (state: any) => {
    return {
        num: state.counter,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

const myCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default myCounter;
