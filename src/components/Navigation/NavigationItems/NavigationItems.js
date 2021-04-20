import React from 'react';
import { useSelector } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

export const NavigationItems = (props) => {
    // const { isAuth } = props;
    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null
    })
    const authentication = !isAuthenticated ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    );

    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
          Burger Builder
        </NavigationItem>
        {isAuthenticated && (
          <NavigationItem link="/orders">Orders</NavigationItem>
        )}
        {authentication}
      </ul>
    );
}; 