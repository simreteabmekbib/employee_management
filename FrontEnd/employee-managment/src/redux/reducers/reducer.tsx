// import {
//     CREATE_TUTORIAL,
//     RETRIEVE_TUTORIALS,
//     UPDATE_TUTORIAL,
//     DELETE_TUTORIAL,
//     DELETE_ALL_TUTORIALS,
//   } from "../actions/types";
  
//   const initialState: any[] = [];
  
//   function tutorialReducer(tutorials = initialState, action: { type: any; payload: any; }) {
//     const { type, payload } = action;
  
//     switch (type) {
//       case CREATE_TUTORIAL:
//         return [...tutorials, payload];
  
//       case RETRIEVE_TUTORIALS:
//         return payload;
  
//       case UPDATE_TUTORIAL:
//         return tutorials.map((tutorial) => {
//           if (tutorial.id === payload.id) {
//             return {
//               ...tutorial,
//               ...payload,
//             };
//           } else {
//             return tutorial;
//           }
//         });
  
//       case DELETE_TUTORIAL:
//         return tutorials.filter(({ id }) => id !== payload.id);
  
//       case DELETE_ALL_TUTORIALS:
//         return [];
  
//       default:
//         return tutorials;
//     }
//   };
  
//   export default tutorialReducer;

import ActionTypes from "../actions/types";
import { IEmployee, IState, ActionProp } from "../actions/interface";

interface IEmployeeOpt extends Omit<IEmployee, 'birthDate'> {
    birthDate?: Date;
}

const initialState: IState<IEmployeeOpt> = {
    employees: [],
    currentEmployee: {}
};

export default function reducer(state: IState<IEmployeeOpt> = initialState, action: ActionProp) {
    switch (action.type) {
        case ActionTypes.GET_EMPLOYEE:
            return {
                ...state,
                currentEmployee: state.employees.find((e) => e._id === action.payload._id)
            }
        case ActionTypes.GET_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.payload
            }
        case ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: [
                    ...state.employees,
                    action.payload
                ]
            };
        case ActionTypes.UPDATE_SALARY_SUCCESS:
            return {
                ...state,
                currentEmployee: {...state.currentEmployee, salary: action.payload.salary},
                employees: state.employees.map(e => e._id === action.payload._id ? { ...e, salary: action.payload.salary } : e)
            }
        case ActionTypes.DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: state.employees.filter(e => e._id !== action.payload._id)
            }
        default:
            return state;
    }
}