import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [props.elementConfig.className];

    if (!props.valid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
            {...props.elementConfig}
            className = {inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (
                <select
                    className = {inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>)
                    )}
                </select>
            );
            break;
        default:
            inputElement = <input {...props.elementConfig} className = {inputClasses.join(' ')} value={props.value} onChange={props.changed} />
    }


    return (
        <div>
            {inputElement}
        </div>
    );
};

export default input;