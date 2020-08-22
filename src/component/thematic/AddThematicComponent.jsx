import React, { Component } from 'react';

import ThematicApiService from "../../service/thematic/ThematicApiService";
import Input from '../UI/input/Input';

class AddThematicComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            orderForm: {
                title: {
                    label: 'Title:',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        name: 'title',
                        placeholder: 'title',
                        className: 'form-control'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                }
            },
            message: null
        }
        this.saveThematic = this.saveThematic.bind(this);
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    saveThematic = (e) => {
        e.preventDefault();
        let thematic = {title: this.state.orderForm.title.value};
        ThematicApiService.addThematic(thematic)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/themes');
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
        let enable = this.state.orderForm.title.valid && this.state.orderForm.title.touched
        let form = (
            <form >
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
                <button disabled={!enable} className="btn btn-success" onClick={this.saveThematic}>Save</button>
            </form>
        )
        return(
            <div>
                <h2 className="text-center">Add Theme</h2>
                {form}
            </div>
        );
    }
}

export default AddThematicComponent;