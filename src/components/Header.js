import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { startLogout } from "../actions/auth";

export const Header = ({ startLogout }) => (

    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
        <button
            onClick={startLogout}   
        >
            Logout
        </button>
    </header>

);

export default connect(null, { startLogout })(Header);