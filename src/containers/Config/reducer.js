import { Map, OrderedMap } from 'immutable';

const initialState = Map({
  url: ''
});

const handleLoadUrl = (state, action) => {
  return state
    .set('url', action.url);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_URL':
      return handleLoadUrl(state, action);
    default:
      return state;
  }
};

export default reducer;
