import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    name: string,
    dateOfBirth: Date,
    gender: string,
    salary: Number,
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            name: '',
            dateOfBirth: Date(),
            gender: '',
            salary: 0,
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            name: this.state.name,
            dateOfBirth: new Date(this.state.dateOfBirth),
            gender: this.state.gender,
            salary: this.state.salary,
        }
        console.log(formData);
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        axios.post(`http://localhost:4000/employees/addEmployee`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.name);
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
    })
}
public render() {
    const { submitSuccess, loading } = this.state;
    return (
        <div>
            <div className={"col-md-12 form-wrapper"}>
                <h2> Create Post </h2>
                {!submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Fill the form below to create a new post
                </div>
                )}
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submitted!
                        </div>
                )}
                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                    <div className="form-group col-md-12">
                        <label htmlFor="name"> name </label>
                        <input type="text" id="name" onChange={(e) => this.handleInputChanges(e)} name="name" className="form-control" placeholder="Enter employee's name" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="dateOfBirth"> Date Of Birth </label>
                        <input type="date" id="dateOfBirth" onChange={(e) => this.handleInputChanges(e)} name="dateOfBirth" className="form-control" placeholder="yyyy-mm-dd" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="gender"> Gender </label>
                        <input type="text" id="gender" onChange={(e) => this.handleInputChanges(e)} name="gender" className="form-control" placeholder="Enter employee's gender" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="salary"> Salary </label>
                        <input type="number" id="salary" onChange={(e) => this.handleInputChanges(e)} name="salary" className="form-control" placeholder="Enter employee's salary" />
                    </div>                    
                    <div className="form-group col-md-4 pull-right">
                        <button className="btn btn-success" type="submit">
                            Create employee
                        </button>
                        {loading &&
                            <span className="fa fa-circle-o-notch fa-spin" />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

}

export default withRouter(Create)