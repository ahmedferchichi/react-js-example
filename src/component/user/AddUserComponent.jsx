import React, { Component } from 'react';

import ApiService from "../../service/ApiService";
import Input from '../UI/input/Input';

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            orderForm: {
                email: {
                    label: 'E-mail address',
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        name: 'email',
                        placeholder: 'Enter your E-mail',
                        className: 'form-control'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    label: 'Password',
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        name: 'password',
                        placeholder: 'Enter your password',
                        className: 'form-control'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 8
                    },
                    valid: false,
                    touched: false
                },
                firstName: {
                    label: 'First Name:',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        name: 'firstName',
                        placeholder: 'First Name',
                        className: 'form-control'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                lastName: {
                    label: 'Last Name:',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        name: 'lastName',
                        placeholder: 'Last name',
                        className: 'form-control'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                userType: {
                    label: 'User Type:',
                    elementType: 'select',
                    elementConfig: {
                        options: [
                        { value: "Administrateur", displayValue: 'Administrateur'},
                        { value: "Modérateur", displayValue: 'Modérateur'},
                        { value: "Rédacteur", displayValue: 'Rédacteur'}
                        ],
                        className: 'form-control'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
            },
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {email: this.state.orderForm.email.value, password: this.state.orderForm.password.value, firstName: this.state.orderForm.firstName.value, lastName: this.state.orderForm.lastName.value, typeUser: this.state.orderForm.userType.value === "Rédacteur" ? "R" : this.state.userType === "Modérateur" ? "M" : "A"};
        ApiService.addUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/users');
            });
    }

    onChange = (e, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm};
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity (updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const formElementsArray =[];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let enable = this.state.orderForm.email.valid && this.state.orderForm.email.touched
                       && this.state.orderForm.password.valid && this.state.orderForm.password.touched
                       && this.state.orderForm.firstName.valid && this.state.orderForm.firstName.touched
                       && this.state.orderForm.lastName.valid && this.state.orderForm.lastName.touched
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <div className="form-group">
                        <label>{formElement.config.label}</label>
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            valid={formElement.config.valid}
                            touched={formElement.config.touched}
                            changed={(e)=>this.onChange(e,formElement.id)}
                        />
                    </div>
                ))}
                <button disabled={!enable} className="btn btn-success" onClick={this.saveUser}>Save</button>
            </form>
        )
        return(
            <div>
                <h2 className="text-center">Add User</h2>
                {form}
            </div>
        );
    }
}

export default AddUserComponent;