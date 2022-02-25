import { AxiosResponse } from 'axios';
import { takeEvery, call, put, all } from 'redux-saga/effects';
import { getAllEmployees, postEmployee, putEmployee, deleteEmployee } from '../services/employees.service';
import ActionTypes from './types';
import { IEmployee, IAction } from './interface';

function* getEmployees() {
    try {
        const res: AxiosResponse<Array<IEmployee>> = yield call(getAllEmployees);
        yield put({ type: ActionTypes.GET_EMPLOYEES_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: ActionTypes.GET_EMPLOYEES_FAIL });
    }
}

function* newEmployee(action: IAction) {
    try {
        const res: AxiosResponse<IEmployee> = yield call(postEmployee, action.payload);
        yield put({ type: ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: ActionTypes.ADD_NEW_EMPLOYEE_FAIL });
    }
}

function* updateEmployee(action: IAction) {
    try {
        const res: AxiosResponse<IEmployee> = yield call(putEmployee, action.payload._id!, action.payload);
        yield put({ type: ActionTypes.UPDATE_SALARY_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: ActionTypes.UPDATE_SALARY_FAIL })
    }
}

function* removeEmployee(action: IAction) {
    try {
        yield call(deleteEmployee, action.payload._id!);
        yield put({ type: ActionTypes.DELETE_EMPLOYEE_SUCCESS, payload: { _id: action.payload._id } });
    }
    catch {
        yield put({ type: ActionTypes.DELETE_EMPLOYEE_FAIL });
    }
}

function* watchGetEmployees() {
    yield takeEvery(ActionTypes.GET_EMPLOYEES, getEmployees);
}

function* watchCreateEmployee() {
    yield takeEvery(ActionTypes.ADD_NEW_EMPLOYEE, newEmployee);
}

function* watchUpdateEmployee() {
    yield takeEvery(ActionTypes.UPDATE_SALARY, updateEmployee);
}

function* watchRemoveEmployee() {
    yield takeEvery(ActionTypes.DELETE_EMPLOYEE, removeEmployee);
}

export default function* rootSaga() {
    yield all([
        watchGetEmployees(),
        watchCreateEmployee(),
        watchUpdateEmployee(),
        watchRemoveEmployee()
    ])
}

// import {
//     CREATE_TUTORIAL,
//     RETRIEVE_TUTORIALS,
//     UPDATE_TUTORIAL,
//     DELETE_TUTORIAL,
//     DELETE_ALL_TUTORIALS
//   } from "./types";
  
//   import TutorialDataService from "../services/tutorial.service";
  
//   export const createTutorial = (name: string,
//     dateOfBirth: Date,
//     gender: string,
//     salary: Number,) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
//     try {
//       const res = await TutorialDataService.create({ name, dateOfBirth, gender, salary });
  
//       dispatch({
//         type: CREATE_TUTORIAL,
//         payload: res.data,
//       });
  
//       return Promise.resolve(res.data);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   };
  
//   export const retrieveTutorials = () => async (dispatch: any) => {
//     try {
//       const res = await TutorialDataService.getAll();
//       console.log(res)
//       dispatch({
//         type: RETRIEVE_TUTORIALS,
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   export const updateTutorial = (id: any, data: any) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
//     try {
//       const res = await TutorialDataService.update(id, data);
  
//       dispatch({
//         type: UPDATE_TUTORIAL,
//         payload: data,
//       });
  
//       return Promise.resolve(res.data);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   };
  
//   export const deleteTutorial = (id: any) => async (dispatch: any) => {
//     try {
//       await TutorialDataService.delete(id);
  
//       dispatch({
//         type: DELETE_TUTORIAL,
//         payload: { id },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   export const deleteAllTutorials = () => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
//     try {
//       const res = await TutorialDataService.deleteAll();
  
//       dispatch({
//         type: DELETE_ALL_TUTORIALS,
//         payload: res.data,
//       });
  
//       return Promise.resolve(res.data);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   };
  
//   export const findTutorialsByTitle = (name: any) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
//     try {
//       const res = await TutorialDataService.findByTitle(name);
  
//       dispatch({
//         type: RETRIEVE_TUTORIALS,
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };