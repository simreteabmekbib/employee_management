import http from "../http-common";
import axios from "axios";
import { IEmployee } from '../actions/interface';

//axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getAllEmployees = async () => http.get("/");
export const getEmployee = async (id: string) => http.get(`/editEmployee/${id}`);
export const postEmployee = async (employee: IEmployee) => http.post("/addEmployee", employee);
export const putEmployee = async (id: string, employee: IEmployee) => http.post(`/updateEmployee/${id}`, {...employee, birthDate: new Date(employee.birthDate) });
export const deleteEmployee = async (id: string) => http.get(`/deleteEmployee/${id}`);
// import http from "../http-common";

// class TutorialDataService {
//   getAll() {
//     return http.get("/");
//   }

//   get(id: any) {
//     return http.get(`/editEmployee/${id}`);
//   }

//   create(data: any) {
//     return http.post("/addEmployee", data);
//   }

//   update(id: any, data: any) {
//     return http.put(`/updateEmployee/${id}`, data);
//   }

//   delete(id: any) {
//     return http.delete(`/deleteEmployee/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }

//   findByTitle(title: any) {
//     return http.get(`/tutorials?title=${title}`);
//   }
// }

// export default new TutorialDataService();