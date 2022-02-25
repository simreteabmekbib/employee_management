import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/es/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { reducer, ActionTypes, rootSaga} from './redux/reducers/index';

const persistConfig = {
  key: 'employees',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer as any);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, compose(applyMiddleware(sagaMiddleware), devToolsEnhancer({ trace: true })));
const persistedStore = persistStore(store);
sagaMiddleware.run(rootSaga);

const action = (type: ActionTypes, payload: Object) => store.dispatch({ type, payload });

function render() {
  ReactDOM.render(
      <PersistGate persistor={persistedStore}>
        <App
          state={store.getState() as any}
          onInit={(payload: Object) => action(ActionTypes.GET_EMPLOYEES, payload)}
          onGetOne={(payload: Object) => action(ActionTypes.GET_EMPLOYEE, payload)}
          onCreate={(payload: Object) => action(ActionTypes.ADD_NEW_EMPLOYEE, payload)}
          onEdit={(payload: Object) => action(ActionTypes.UPDATE_SALARY, payload)}
          onDelete={(payload: Object) => action(ActionTypes.DELETE_EMPLOYEE, payload)} />
      </PersistGate>,
    document.getElementById('root')
  )
}

render();
store.subscribe(render);


// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from "./reportWebVitals";
// import { Provider } from "react-redux";
// import store from "./redux/store";

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>,
//   // <BrowserRouter>
//   //       <App />
//   //   </BrowserRouter>,
//   document.getElementById("root")
// );

// reportWebVitals();
// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import './index.css';
// // import App from './App';
// // import reportWebVitals from './reportWebVitals';

// // ReactDOM.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>,
// //   document.getElementById('root')
// // );

// // // If you want to start measuring performance in your app, pass a function
// // // to log results (for example: reportWebVitals(console.log))
// // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();
