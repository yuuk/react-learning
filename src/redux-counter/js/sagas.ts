import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { INCREMENT_COUNTER, ASYNC_INCREMENT_COUNTER } from './actions';

function* asyncIncrement() {
    yield put({
        type: INCREMENT_COUNTER,
        payload: 'async',
    });
}

export default function* rootSaga() {
    yield takeEvery(ASYNC_INCREMENT_COUNTER, asyncIncrement);
}
