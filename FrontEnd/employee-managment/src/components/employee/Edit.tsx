import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    _id: string,
    employee: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
class EditCustomer extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            _id: this.props.match.params._id,
            employee: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:4000/employees/editEmployee/${this.state._id}`).then(data => {
            this.setState({ employee: data.data });
            this.setState({ values: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.post(`http://localhost:4000/employees/updateEmployee/${this.state._id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }

    private setValues = (values: IValues) => {
        console.log(this.state.values);
        console.log(values);
        this.setState({ values: { ...this.state.values, ...values } });
    }
    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }
    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.employee &&
                    <div>
                        < h1 > Employee List Management App</h1>

                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit Employee Information</h2>
                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Employee's details has been edited successfully </div>
                                )}
                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="name"> Name </label>
                                        <input type="text" id="name" defaultValue={this.state.employee.name} onChange={(e) => this.handleInputChanges(e)} name="name" className="form-control" placeholder="Enter employee's name" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="dateOfBirth"> Date Of Birth </label>
                                        <input type="date" id="dateOfBirth" defaultValue={this.state.employee.dateOfBirth} onChange={(e) => this.handleInputChanges(e)} name="dateOfBirth" className="form-control" placeholder="Enter employee's date of birth" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="gender"> Gender </label>
                                        <input type="text" id="gender" defaultValue={this.state.employee.gender} onChange={(e) => this.handleInputChanges(e)} name="gender" className="form-control" placeholder="Enter employee's gender" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="salary"> Salary </label>
                                        <input type="number" id="salary" defaultValue={this.state.employee.salary} onChange={(e) => this.handleInputChanges(e)} name="salary" className="form-control" placeholder="Enter employee's salary" />
                                    </div>
                                    
                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Customer </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default withRouter(EditCustomer)