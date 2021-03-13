import React, { Component } from "react";

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                {/* <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div> */}
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <label for="role">Role</label>
                    {/* <input type="password" className="form-control" placeholder="Enter password" /> */}
                    <select id="role_id" name="role" style={{marginLeft: '20px'}}>
                        <option value="student">Student</option>
                        <option value="professor">Professor</option>
                        {/* <option value="admin">Admin</option> */}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                {/* <p className="forgot-password text-right">
                    Already registered 
                    <a href="localhost:3000/sign-in">sign in?</a>
                    <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                </p> */}
            </form>
        );
    }
}