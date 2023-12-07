import { combineReducers } from 'redux';

const reviewGrantReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_REVIEW':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  reviewGrantReducer,
});
