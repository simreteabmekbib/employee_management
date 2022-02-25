import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/employee/Create";
import EditEmployee from "./components/employee/Edit";
import { AppProps, IEmployee } from "./redux/actions/interface";

function App({
  state,
  onInit,
  onGetOne,
  onCreate,
  onEdit,
  onDelete,
}: AppProps) {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={"/"}> Home </Link>
            </li>
            <li>
              <Link to={"/create"}> Create Customer </Link>
            </li>
          </ul>
        </nav>
        <Switch>

          <Route path={"/create"} children={<Create onCreate={onCreate} />} />
          <Route
            path={"/edit/:_id"}
            children={
              <EditEmployee
                onEdit={onEdit}
                currentEmployee={state.currentEmployee as IEmployee}
              />
            }
          />
          <Route
            path={"/"}
            children={
              <Home
                employees={state.employees}
                onInit={onInit}
                onGetOne={onGetOne}
                onDelete={onDelete}
              />
            }
          />
         
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
