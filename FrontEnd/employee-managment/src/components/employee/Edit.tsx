import * as React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';

import { IEmployee } from '../../redux/actions/interface';

interface EditEmployeeProps{
    onEdit: Function;
    currentEmployee: IEmployee;
  }
  
  interface IProps extends EditEmployeeProps{
    id: string;
    history: any;
  }
  
  interface IState extends IEmployee { 
    submitSuccess: boolean, 
            loading:boolean,
  }
  
  export default function EditEmployee({onEdit, currentEmployee}: EditEmployeeProps) {
    const id = currentEmployee._id;
    const history = useHistory();   

    return (
      <EditCustomer
        id={id!}
        onEdit={onEdit}
        currentEmployee={currentEmployee} history={history} />
    );
  }
  

class EditCustomer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          name: "",
          birthDate: new Date(),
          gender: "",
          salary: 0,
          submitSuccess: false, 
            loading:false,
        };
    }
    public componentDidMount(): void {
        let e = this.props.currentEmployee;
    this.setState({
      _id: e._id,
      name: e.name,
      birthDate: e.birthDate,
      gender: e.gender,
      salary: e.salary,
    });
    }
    
    onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
          name: String(e.target.value),
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
          salary: Number(e.target.value),
        });
      }
    
      onSubmit(e: React.FormEvent<HTMLFormElement>) {
        this.setState({ loading: true });

        e.preventDefault();
        this.props.onEdit(this.state);
        this.setState({ submitSuccess: true, loading: false });
        setTimeout(() => {
          
          this.props.history.push('/');
                      }, 1500)

      }
    
    render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.props.currentEmployee &&
                    <div>
                        < h1 > Employee List Management App</h1>

                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit Employee Information</h2>
                                {
                                submitSuccess &&
                                 (
                                    <div className="alert alert-info" role="alert">
                                        Employee's details has been edited successfully </div>
                                )}
                                <form id={"create-post-form"} onSubmit={this.onSubmit} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="name"> Name </label>
                                        <input type="text" id="name" defaultValue={this.props.currentEmployee.name} onChange={(e) => this.onChangeName(e)} name="name" className="form-control" placeholder="Enter employee's name" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="dateOfBirth"> Date Of Birth </label>
                                        <input type="date" id="dateOfBirth" defaultValue={moment(this.props.currentEmployee.birthDate).utc().format('YYYY-MM-DD')} onChange={(e) => this.onChangeDateOfBirth(e)} name="dateOfBirth" className="form-control" placeholder="Enter employee's date of birth" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="gender"> Gender </label>
                                        <input type="text" id="gender" defaultValue={this.props.currentEmployee.gender} onChange={(e) => this.onChangeGender(e)} name="gender" className="form-control" placeholder="Enter employee's gender" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="salary"> Salary </label>
                                        <input type="number" id="salary" defaultValue={this.props.currentEmployee.salary} onChange={(e) => this.onChangeSalary(e)} name="salary" className="form-control" placeholder="Enter employee's salary" />
                                    </div>
                                    
                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Customer </button>
                                        {
                                        loading &&
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
