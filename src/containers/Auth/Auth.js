import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  createElement,
  updateObject,
  checkValidity,
} from '../../shared/utility';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { spinner as Spinner } from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

import { auth, setAuthRedirectPath } from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: createElement({configType: 'email', placeholder: 'Email Address', required: true, isEmail: true}),
            password: createElement({configType: 'password', placeholder: 'Password', required: true, lengthInfo: { minLength: 6 }})
        },
        isSignup: true
    };

    componentDidMount() {
        const {
          buildingBurger,
          authRedirectPath,
          onSetAuthRedirectPath,
          isAuthenticated,
          history
        } = this.props;
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
        if (isAuthenticated) { return history.push('/') }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const { controls } = this.state;
        const updatedControls = updateObject(controls, {
          [inputIdentifier]: updateObject(controls[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(
              event.target.value,
              controls[inputIdentifier].validation
            ),
            touched: true,
          })
        });
        this.setState({ controls: updatedControls });
    };

    submitHandler = event => {
        event.preventDefault();
        const { controls: { email: { value: emailVal }, password: { value: passwordVal } } } = this.state;
        const { onAuth } = this.props;
        const { isSignup } = this.state;
        onAuth(emailVal, passwordVal, isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        });
    }

    render() {
        const { loading, error, isAuthenticated, authRedirectPath } = this.props;
        const { controls, isSignup } = this.state;
        const formElementsArray = Object.entries(controls).map(([key, value]) => {
            const {
                elementType,
                elementConfig,
                value: val,
                options,
                valid,
                validation,
                touched,
                isEmail
            } = value;
            return (
                <Input
                key={key}
                elementType={elementType}
                elementConfig={elementConfig}
                value={val}
                valueType={key}
                options={options}
                invalid={!valid}
                shouldValidate={validation}
                changed={(event) => this.inputChangedHandler(event, key)}
                touched={touched}
                isEmail={isEmail}
                />
            );
        });

        const errorMessage = (
            <div className={classes.Error}>
                {error?.message || ''}
            </div>
        );

        const authRedirect = isAuthenticated ? <Redirect to={authRedirectPath}/> : null;

        const form = (
          <div className={classes.Auth}>
            {authRedirect}
            <form onSubmit={this.submitHandler}>
              {formElementsArray}
              {error && errorMessage}
              <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
              SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}{' '}
            </Button>
          </div>
        );

        const view = loading ? <Spinner /> : form;

        return view;
    }
}

const mapStateToProps = state => {
    const { loading, error, token, authRedirectPath } = state.auth;
    const { building } = state.burgerBuilder;
    return {
        loading,
        error,
        isAuthenticated: token !== null,
        buildingBurger: building,
        authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => {
            dispatch(auth(email, password, isSignup))
        },
        onSetAuthRedirectPath: () => {
            dispatch(setAuthRedirectPath('/'))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);