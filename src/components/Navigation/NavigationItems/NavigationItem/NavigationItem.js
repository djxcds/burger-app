import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    const { link, children, exact } = props;
    return (
      <li className={classes.NavigationItem}>
        <NavLink to={link} exact={exact} activeClassName={classes.active}>
          {children}
        </NavLink>
      </li>
    );
};

export default navigationItem;

