const updateObject = (state, updateObject) => {
    return {
        ...state,
        ...updateObject
    };
};

const createElement = ({
  type = 'input',
  configType = 'text',
  placeholder = '',
  value = '',
  options = [],
  required = true,
  valid = false,
  lengthInfo = {
    minLength: null,
    maxLength: null,
  },
  touched = false,
  isEmail = false
}) => {
  return {
    elementType: type,
    elementConfig: {
      type: configType,
      placeholder,
    },
    value,
    options,
    validation:
      required || lengthInfo.minLength || lengthInfo.maxLength || isEmail
        ? {
            required,
            minLength: lengthInfo.minLength,
            maxLength: lengthInfo.maxLength,
            isEmail
          }
        : undefined,
    valid,
    touched,
  };
};

const checkValidity = (value, rules) => {
        if (!rules) return true;
        let isValid = true;
        if (rules.required) {
        isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

export { updateObject, createElement, checkValidity };