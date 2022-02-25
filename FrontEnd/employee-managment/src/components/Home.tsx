import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { IEmployee } from '../redux/actions/interface';
import styled from "styled-components";


const DeleteButton = styled.button`
  background-color: white;
  font-size: 15px;
  color: red;
`;

const EditButton = styled.a`
  background-color: green;
  font-size: 15px;
  color: white;
`;

interface IProps {
    employees: Array<IEmployee>;
    onInit: Function;
    onGetOne: Function;
    onDelete: Function;
  }
  
  interface IState {
    employees: IEmployee[];
  }
  interface IPropEmployee {
    employee: IEmployee;
    onGetOne: Function;
    onDelete: Function;
  }

export default class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.props.onInit();
        //this.state 
    }
    //public componentDidMount(): void {
        // axios.get(`http://localhost:4000/employees`).then(data => {
        //     this.setState({ employees: data.data })
        // })
        //this.props.retrieveTutorials();
    //}
    // public deleteCustomer(_id: string) {
    //     // axios.get(`http://localhost:4000/employees/deleteEmployee/${_id}`).then(data => {
    //     //     const index = this.state.employees.findIndex(employee => employee._id === _id);
    //     //     this.state.employees.splice(index, 1);
    //     //     this.props.history.push('/');
    //     // })
    //     this.props.deleteTutorial();
    // }
    public render() {
    //const { tutorials } = this.props.retrieveTutorials();
    //console.log("tutorials: "+ tutorials);
        return (
            <div>
                {this.props.employees.length === 0 && (
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
                                {this.props.employees && this.props.employees.map((employee) =>
                                    <tr key={employee._id}>
                                        <td>{employee.name}</td>
                                        <td>{moment(employee.birthDate).utc().format('MM/DD/YYYY')}</td>
                                        <td>{employee.gender}</td>
                                        <td>{employee.salary}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${employee._id}`} onClick={() => this.props.onGetOne({_id: employee._id})} className="btn btn-sm btn-outline-secondary">Edit Employee </Link>
                                                    <DeleteButton className="btn btn-sm btn-outline-secondary" onClick={() => this.props.onDelete({_id: employee._id?.toString()})}
                                                    >Delete Employee</DeleteButton>
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
