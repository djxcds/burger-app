import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
          return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        const { children, isAuthenticated } = this.props;
        const { showSideDrawer } = this.state;

        return (
          <Aux>
            <div>
              <Toolbar
                isAuth={isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}
              />
              <SideDrawer
                isAuth={isAuthenticated}
                open={showSideDrawer}
                closed={this.sideDrawerClosedHandler}
              />
            </div>
            <main className={classes.Content}>{children}</main>
          </Aux>
        );
    }
};

const mapStateToProps = state => {
    const { token } = state.auth;
    return {
        isAuthenticated: token !== null
    };
};

export default connect(mapStateToProps)(Layout);