import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => {
    const { clicked } = props;
    return (
        <div className={classes.DrawerToggle} onClick={clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default drawerToggle;