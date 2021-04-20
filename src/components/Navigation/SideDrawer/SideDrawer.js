import React from 'react';

import Logo from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    const { closed, open, isAuth } = props;
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    return (
        <Aux>
            <Backdrop show={open} clicked={closed}/>
            <div className={attachedClasses.join(' ')} onClick={closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={isAuth} />
                </nav>
            </div>
        </Aux>
    )
};

export default sideDrawer;