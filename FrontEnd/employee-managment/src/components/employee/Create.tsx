import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IEmployee } from '../../redux/actions/interface';

interface IProps extends RouteComponentProps{
    onCreate: Function
}

interface IState extends IEmployee {
    submitSuccess: boolean, loading:boolean,
}

class Create extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            birthDate: new Date(),
            gender: '',
            salary: 0,
            submitSuccess: false, 
            loading:false,
        }
    }

    onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: String(e.target.value)
        });
    }

    onChangeDateOfBirth(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
          birthDate: new Date(e.target.value),
        });
      }

      onChangeGender(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
          gender: String(e.target.value),
        });
      }

    onChangeSalary(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            salary: Number(e.target.value)
        });
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>) {
                this.setState({ loading: true });

        e.preventDefault();
        this.props.onCreate(this.state);
        this.setState({ submitSuccess: true, loading: false });
        setTimeout(() => {
                            this.props.history.push('/');
                        }, 1500)
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
                <form id={"create-post-form"} onSubmit={this.onSubmit} noValidate={true}>
                    <div className="form-group col-md-12">
                        <label htmlFor="name"> name </label>
                        <input type="text" id="name" onChange={(e) => this.onChangeName(e)} name="name" className="form-control" placeholder="Enter employee's name" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="dateOfBirth"> Date Of Birth </label>
                        <input type="date" id="dateOfBirth" onChange={(e) => this.onChangeDateOfBirth(e)} name="dateOfBirth" className="form-control" placeholder="yyyy-mm-dd" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="gender"> Gender </label>
                        <input type="text" id="gender" onChange={(e) => this.onChangeGender(e)} name="gender" className="form-control" placeholder="Enter employee's gender" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="salary"> Salary </label>
                        <input type="number" id="salary" onChange={(e) => this.onChangeSalary(e)} name="salary" className="form-control" placeholder="Enter employee's salary" />
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