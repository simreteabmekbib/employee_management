import http from "../http-common";
import { IEmployee } from '../actions/interface';

export const getAllEmployees = async () => http.get("/");
export const getEmployee = async (id: string) => http.get(`/editEmployee/${id}`);
export const postEmployee = async (employee: IEmployee) => http.post("/addEmployee", employee);
export const putEmployee = async (id: string, employee: IEmployee) => http.post(`/updateEmployee/${id}`, {...employee, birthDate: new Date(employee.birthDate) });
export const deleteEmployee = async (id: string) => http.get(`/deleteEmployee/${id}`);