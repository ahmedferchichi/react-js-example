import React, { Component } from 'react'

import ApiService from "../../service/ApiService";
import Spinner from "../UI/Spinner/Spinner";

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            loading: false,
            message: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        this.setState({loading:true});
        ApiService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data.result});
                this.setState({loading:false});
            });
    }

    deleteUser(id) {
        this.setState({loading:true});
        ApiService.deleteUser(id)
                    .then(res => {
                        this.setState({message : 'User deleted successfully.'});
                        this.setState({users: this.state.users.filter(user => user.id !== id)});
                        this.setState({loading:false});
                    });
    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    render() {
        let table = <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="hidden">Id</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>TypeUser</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.typeUser === "R" ? "Rédacteur" : user.typeUser === "M" ? "Modérateur" : "Administrateur"}</td>
                                            <td>
                                                <button title="Delete" onClick={() => this.deleteUser(user.id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                                <button title="Edit" onClick={() => this.editUser(user.id)} style={{marginLeft: '20px'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>;

        if (this.state.loading){
            table = <Spinner />;
        }

        return (
            <div>
                <h2 className="text-center">User Details</h2>
                <button className="btn btn-danger" style={{width:'100px'}} onClick={() => this.addUser()}> Add User</button>
                {table}

            </div>
        );
    }

}

export default ListUserComponent;