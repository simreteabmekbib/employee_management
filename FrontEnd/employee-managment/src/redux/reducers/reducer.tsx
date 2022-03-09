import Types from "../actions/types";
import { IEmployee, IState, ActionProp } from "../actions/interface";

const initialState: IState<IEmployee> = {
    employees: [],
    currentEmployee: {}
};

export default function reducer(state: IState<IEmployee> = initialState, action: ActionProp) {
    switch (action.type) {
        case Types.GET_EMPLOYEE:
            return {
                ...state,
                currentEmployee: state.employees.find((e) => e._id === action.payload._id)
            }
        case Types.GET_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.payload
            }
        case Types.ADD_NEW_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: [
                    ...state.employees,
                    action.payload
                ]
            };
        case Types.UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                currentEmployee: {...state.currentEmployee, salary: action.payload.salary, name: action.payload.name, gender: action.payload.gender, birthDate: action.payload.birthDate},
                employees: state.employees.map(e => e._id === action.payload._id ? { ...e, salary: action.payload.salary, name: action.payload.name, gender: action.payload.gender, birthDate: action.payload.birthDate } : e)
            }
        case Types.DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: state.employees.filter(e => e._id !== action.payload._id)
            }
        default:
            return state;
    }
}