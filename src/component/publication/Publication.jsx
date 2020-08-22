import React from 'react';

import classes from './Publication.module.css';

const publication = (props) => {
    return (
        <div className={classes.Publication}>
            <h1>{props.element.title}</h1>
            <p>{props.element.content}</p>
            <p>{props.element.editor}</p>
        </div>
    )
};

export default publication;