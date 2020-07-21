import React from 'react';
import classes from './button.css';

const Button = (props) => {
    return (
        <button className={[classes.Button, classes[props.btnType]].join(' ')} 
        onClick={props.clicked}>{props.name}</button>
        )
}

export default Button;