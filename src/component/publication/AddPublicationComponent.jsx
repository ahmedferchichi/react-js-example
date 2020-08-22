import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

import PublicationApiService from "../../service/PublicationApiService";
import ThematicApiService from "../../service/thematic/ThematicApiService";
import Input from '../UI/input/Input';

class AddPublicationComponent extends Component{

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
                },
                content: {
                    label: 'Content:',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        name: 'content',
                        placeholder: 'content',
                        className: 'form-control'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                editor: {
                    label: 'Editor:',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        name: 'editor',
                        placeholder: 'editor',
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
            date: new Date(),
            thematics: [],
            message: null,
            thematicOptions: []
        }
        this.savePublication = this.savePublication.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentDidMount() {
        ThematicApiService.fetchThemes()
            .then((res) => {
                this.setState({thematicOptions: res.data.result})
            });
    }

    savePublication = (e) => {
        e.preventDefault();
        let publication = {title: this.state.orderForm.title.value, content: this.state.orderForm.content.value, editor: this.state.orderForm.editor.value, date: this.state.date, thematics: this.state.thematics};
        PublicationApiService.addPublication(publication)
            .then(res => {
                this.setState({message : 'Publication added successfully.'});
                this.props.history.push('/publications');
            });
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

    onChange = (e, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm};
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity (updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    onSelect(selectedList, selectedItem) {
        this.setState({thematics: selectedList});
    }

    onRemove(selectedList, removedItem) {
        this.setState({thematics: selectedList});
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
                      && this.state.orderForm.content.valid && this.state.orderForm.content.touched
                      && this.state.orderForm.editor.valid && this.state.orderForm.editor.touched
                      && this.state.thematics.length !== 0
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
                <div className="form-group">
                    <label>Thematic:</label>
                    <Multiselect
                        options={this.state.thematicOptions} // Options to display in the dropdown
                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        onSelect={this.onSelect} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="title" // Property name to display in the dropdown options
                    />
                </div>
                <button disabled={!enable} className="btn btn-success" onClick={this.savePublication}>Save</button>
            </form>
        )
        return(
            <div>
                <h2 className="text-center">Add Publication</h2>
               {form}
            </div>
        );
    }
}

export default AddPublicationComponent;