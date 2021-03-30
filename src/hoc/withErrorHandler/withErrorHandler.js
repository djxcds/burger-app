import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return  class extends Component {
        state = {
            error: null
        };
        // interceptorsReq = null;
        // interceptorsRes = null;

        componentDidMount() {
            // 
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.interceptorsReq);
            axios.interceptors.response.eject(this.interceptorsRes);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null});
        }

        render () {
            const { error } = this.state;
            this.interceptorsReq = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                // this.state = { error: null };
                return req;
            });
            this.interceptorsRes = axios.interceptors.response.use(res => res, error => {
                // this.state = { error };
                this.setState({ error: error });
            });
            return (
                <Aux>
                    <Modal 
                        show={error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;