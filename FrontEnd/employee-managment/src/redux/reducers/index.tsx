// import { combineReducers } from "redux";
// import tutorials from "./tutorials";

// export default combineReducers({
//   tutorials,
// });

import reducer from './reducer';
import ActionTypes from '../actions/types';
import rootSaga from '../actions/sagas';

export { reducer, ActionTypes, rootSaga };