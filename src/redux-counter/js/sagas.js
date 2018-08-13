import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {INCREMENT_COUNTER, DECREMENT_COUNTER} from './actions'




export default function* rootSaga() {
	yield put({type: INCREMENT_COUNTER});
}
