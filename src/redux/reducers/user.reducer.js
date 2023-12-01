import { combineReducers } from 'redux';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const currentCycle = (state = {cycle_id: ""}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CYCLE':
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  userReducer,
  currentCycle,
});
