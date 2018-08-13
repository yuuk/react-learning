import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Operator from '../components/Operator'
import * as actions from '../actions/'

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

const myOperator = connect(
    mapStateToProps,
    mapDispatchToProps
)(Operator)

export default myOperator;