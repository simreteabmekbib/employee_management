export interface IEmployee {
    _id?: string;
    name?: string;
    birthDate?: Date;
    gender?: string;
    salary?: number;
    
}

export interface IAction {
    type: string;
    payload: IEmployee
}

export interface IState<T> {
    employees: Array<IEmployee>;
    currentEmployee: T;
}

export interface ActionProp {
    type: string;
    payload: IEmployee;
}

export interface AppProps {
    state: IState<IEmployee>;
    onInit: Function;
    onGetOne: Function;
    onCreate: Function;
    onEdit: Function;
    onDelete: Function;
}