import { combineReducers } from 'redux';
import configReducer from './containers/Config/reducer';
import appReducer from './containers/App/reducer';

const reducers = combineReducers({
    config: configReducer,
    app: appReducer,
});

export default reducers;
