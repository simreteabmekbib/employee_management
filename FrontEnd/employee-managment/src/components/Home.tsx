import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
    employees: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { employees: [] }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:4000/employees`).then(data => {
            this.setState({ employees: data.data })
        })
    }
    public deleteCustomer(_id: string) {
        axios.get(`http://localhost:4000/employees/deleteEmployee/${_id}`).then(data => {
            const index = this.state.employees.findIndex(employee => employee._id === _id);
            this.state.employees.splice(index, 1);
            this.props.history.push('/');
        })
    }
    public render() {
        const employees = this.state.employees;
        return (
            <div>
                {employees.length === 0 && (
                    <div className="text-center">
                        <h2>No employee found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date Of Birth</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees && employees.map(employee =>
                                    <tr key={employee._id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.dateOfBirth}</td>
                                        <td>{employee.gender}</td>
                                        <td>{employee.salary}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${employee._id}`} className="btn btn-sm btn-outline-secondary">Edit Employee </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCustomer(employee._id)}>Delete Employee</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}