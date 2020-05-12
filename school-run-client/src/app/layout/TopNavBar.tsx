import React from 'react'
import { Link, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import { render } from '@testing-library/react';
import Login from '../../component/login/login';
import SignUp from '../../component/login/signup';
const TopNavBar = () => {

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"}>Global Reach</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-in"}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path="/sign-in" component={Login} />
                        <Route path="/sign-up" component={SignUp} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default TopNavBar;
