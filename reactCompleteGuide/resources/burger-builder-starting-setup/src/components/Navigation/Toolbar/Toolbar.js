import React from "react";
import classes from "./Toolbar.css";

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <img src="" alt="Logo" />
            <button>Menu</button>
            <nav>
                <ul>...</ul>
            </nav>
        </header>
    );
};

export default toolbar;