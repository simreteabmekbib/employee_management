import { AxiosResponse } from 'axios';
import { takeEvery, call, put, all } from 'redux-saga/effects';
import { getAllEmployees, postEmployee, putEmployee, deleteEmployee } from '../services/employees.service';
import Types from './types';
import { IEmployee, IAction } from './interface';

function* getEmployees() {
    try {
        const res: AxiosResponse<Array<IEmployee>> = yield call(getAllEmployees);
        yield put({ type: Types.GET_EMPLOYEES_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: Types.GET_EMPLOYEES_FAIL });
    }
}

function* newEmployee(action: IAction) {
    try {
        const res: AxiosResponse<IEmployee> = yield call(postEmployee, action.payload);
        yield put({ type: Types.ADD_NEW_EMPLOYEE_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: Types.ADD_NEW_EMPLOYEE_FAIL });
    }
}

function* updateEmployee(action: IAction) {
    try {
        const res: AxiosResponse<IEmployee> = yield call(putEmployee, action.payload._id!, action.payload);
        yield put({ type: Types.UPDATE_SALARY_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: Types.UPDATE_SALARY_FAIL })
    }
}

function* removeEmployee(action: IAction) {
    try {
        yield call(deleteEmployee, action.payload._id!);
        yield put({ type: Types.DELETE_EMPLOYEE_SUCCESS, payload: { _id: action.payload._id } });
    }
    catch {
        yield put({ type: Types.DELETE_EMPLOYEE_FAIL });
    }
}

function* watchGetEmployees() {
    yield takeEvery(Types.GET_EMPLOYEES, getEmployees);
}

function* watchCreateEmployee() {
    yield takeEvery(Types.ADD_NEW_EMPLOYEE, newEmployee);
}

function* watchUpdateEmployee() {
    yield takeEvery(Types.UPDATE_SALARY, updateEmployee);
}

function* watchRemoveEmployee() {
    yield takeEvery(Types.DELETE_EMPLOYEE, removeEmployee);
}

export default function* rootSaga() {
    yield all([
        watchGetEmployees(),
        watchCreateEmployee(),
        watchUpdateEmployee(),
        watchRemoveEmployee()
    ])
}