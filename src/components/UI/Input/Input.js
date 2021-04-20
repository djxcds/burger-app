import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    const {
      label,
      elementType,
      elementConfig,
      value,
      options,
      changed,
      invalid,
      shouldValidate,
      touched,
      valueType,
    } = props;
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;

    if (invalid && shouldValidate && touched) {
      inputClasses.push(classes.Invalid);
      validationError = <p className={classes.ValidationError}>Please enter a valid {valueType}!</p>;
    }

    switch (elementType) {
      case 'textarea':
        inputElement = (
          <textarea
            className={inputClasses.join(' ')}
            {...elementConfig}
            value={value}
            onChange={changed}
          />
        );
        break;
      case 'select':
        inputElement = (
          <select
            className={inputClasses.join(' ')}
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
            className={inputClasses.join(' ')}
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
        {validationError}
      </div>
    );
}

export default input;