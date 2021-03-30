import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    const { label, elementType, elementConfig, value, options, changed } = props;
    let inputElement = null;

    switch (elementType) {
      case 'textarea':
        inputElement = (
          <textarea
            className={classes.InputElement}
            {...elementConfig}
            value={value}
            onChange={changed}
          />
        );
        break;
      case 'select':
        inputElement = (
          <select
            className={classes.InputElement}
            value={value}
            onChange={changed}
          >
            {options.map((value) => {
              const { value: val, displayValue } = value;
              return (
                <option key={val} value={val}>
                  {displayValue}
                </option>
              );
            })}
          </select>
        );
        break;
      default:
        inputElement = (
          <input
            className={classes.InputElement}
            {...elementConfig}
            value={value}
            onChange={changed}
          />
        );
        break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
        </div>
    )
}

export default input;