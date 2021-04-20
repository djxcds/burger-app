import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';
// import axiosLib from 'axios';

// let source;

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
        };
 
        // source = axiosLib.CancelToken.source();
    }

      componentDidMount() {
        //   Insert into componentDiMount instead of componentWillMount due to depecration
        //   To determine where to put inteceptor subscribables
                this.interceptorsReq = axios.interceptors.request.use((req) => {
                    this.setState({ error: null });
                //   this.state = { ...this.state, error: null };
                  return req;
                });
                this.interceptorsRes = axios.interceptors.response.use(
                  (res) => res,
                  (error) => {
                    // this.state = { ...this.state, error };
                    this.setState({ error });
                  }
                );
      }

      componentWillUnmount() {
        axios.interceptors.request.eject(this.interceptorsReq);
        axios.interceptors.response.eject(this.interceptorsRes);
      }

      errorConfirmedHandler = () => {
        this.setState({ error: null });
      };

      render() {
        const { error } = this.state;
        // this.interceptorsReq = axios.interceptors.request.use((req) => {
        //   this.setState({ error: null });
        //   // this.state = { error: null };
        //   return req;
        // });
        // this.interceptorsRes = axios.interceptors.response.use(
        //   (res) => res,
        //   (error) => {
        //     // this.state = { error };
        //     this.setState({ error: error });
        //   }
        // );
        return (
          <Aux>
            <Modal show={error} modalClosed={this.errorConfirmedHandler}>
              {error ? error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Aux>
        );
      }
    };
}

export default withErrorHandler;