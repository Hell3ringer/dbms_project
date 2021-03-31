import React, { Component } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
const Swal = require('sweetalert2')
var isEmpty = false;
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
function signup(){
    
    const params = {
        id : document.getElementById('id').value,
        pass : document.getElementById('password').value,
        role : document.getElementById('role').value
    }

    if (params.id === ''||params.pass === ''||params.role === '') {
        isEmpty = true;
    }
    
    if (isEmpty) {
        Swal.fire({
            title: 'error',
            text: "Don't leave empty!!",
            icon: 'error',
            confirmButtonText: 'retry'
          }).then((result) =>{
              if (result.isConfirmed) {
                  window.location.replace('/signup')
              }
          }
          )
    }else{
        axios.post('http://localhost:4000/app/signup',{params})
        .then(Response =>{
            if (Response.status === 200) {
                Swal.fire({
                    title: 'success',
                    text: "registered",
                    icon: 'success',
                    confirmButtonText: 'ok'
                  })
            }
        })
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
                    <label>id</label>
                    <input type="text" id="id" className="form-control" placeholder="Enter your id" />
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
                <button type="submit" onClick={signup} className="btn btn-primary btn-block" >Sign Up</button>
                
            </form>
            </div>
            </div>
        );
    }
}

export default SignUp;