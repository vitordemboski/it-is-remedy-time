import { fork, all } from 'redux-saga/effects';
import appSaga from './containers/App/sagas';
import configSaga from './containers/Config/sagas';


function* rootSaga() {
    yield all([
        ...appSaga,
        ...configSaga,
    ]);
}

export default rootSaga;
