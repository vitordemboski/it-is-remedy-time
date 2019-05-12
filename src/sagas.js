import { fork, all } from 'redux-saga/effects';
import appSaga from './containers/App/sagas';


function* rootSaga() {
    yield all([
        ...appSaga,
    ]);
}

export default rootSaga;
