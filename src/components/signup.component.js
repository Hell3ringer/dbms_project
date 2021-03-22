import React, { Component } from "react";

function check_pass() {
    if (document.getElementById('password').value ===
        document.getElementById('confirm_password').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
       
        
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
    }
}

class SignUp extends Component {   
        

    

    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <form>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" id="fullName" className="form-control" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" id="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password" onChange ={check_pass} className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input id="confirm_password" type="password" onChange ={check_pass} className="form-control" placeholder="Confirm password" />
                </div>
                <span id="message"></span>
                <div className="form-group">
                    <label for="role">Role</label>
                    {/* <input type="password" className="form-control" placeholder="Enter password" /> */}
                    <select id="role" name="role" style={{marginLeft: '20px'}}>
                        <option value="student">Student</option>
                        <option value="professor">Professor</option>
                        <option value="admin">Admin</option>
                        {/* <option value="admin">Admin</option> */}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block" >Sign Up</button>
                
            </form>
            </div>
            </div>
        );
    }
}

export default SignUp;