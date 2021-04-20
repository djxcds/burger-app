import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
    const { clicked, btnType, disabled } = props;
    return (
      <button
        className={[classes.Button, classes[btnType]].join(' ')}
        onClick={clicked}
        disabled={disabled}
      >
        {props.children}
      </button>
    );
}

export default button;