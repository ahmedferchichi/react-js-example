import React, { Component } from "react";

import classes from './Auth.module.css';
import Input from '../UI/input/Input';

class AuthComponent extends Component {

    constructor(props) {
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
                }
            }
        }
        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
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

    submit = (e) => {
        this.props.history.push('/');
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
        let enable = this.state.orderForm.email.valid && this.state.orderForm.email.touched && this.state.orderForm.password.valid && this.state.orderForm.password.touched
        let form = (
            <form onSubmit={this.submit}>
                <h3>Sign In</h3>
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
                <button disabled={!enable} type="submit" className="btn btn-primary btn-block"> Submit </button>
            </form>
        )
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default AuthComponent;