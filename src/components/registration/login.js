import '../stylesheets/login_component.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner ">
            <form className="container">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>id </label>
                    <input type="text" className="form-control" placeholder="Enter id" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
                <br></br>
                <p>Don't have an account?    <Link to={'/signup'}>Sign up</Link></p>
            </form>
            </div>
            </div>
        );
    }
}