import React, { Component } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
const Swal = require('sweetalert2')

var isEmpty = false;
var match_pass = false;
var format = true
function check_pass() {
    if (document.getElementById('password').value ===
        document.getElementById('confirm_password').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
        match_pass=true
       
        
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
    }
}


class SignUp extends Component {   
        
    signup(Event){
        Event.preventDefault()
        const params = {
            id : document.getElementById('id').value,
            pass : document.getElementById('password').value,
            role : document.getElementById('role').value
        }
    
        if (params.id === ''||params.pass === ''||params.role === ''||document.getElementById("confirm_password").value==='') {
            isEmpty = true;
            Swal.fire({
                title: 'error',
                text: "Don't leave empty!!",
                icon: 'error',
                confirmButtonText: 'retry'
              }).then((result) =>{
                  if (result.isConfirmed) {
                      isEmpty = false;
                      window.location.replace('/signup')
                  }
              }
              )
        }

        if(params.role==='student'&& (params.id[6]+params.id[7]!=='PS')){
            format=false
            Swal.fire({
                title: 'error',
                text: 'Student ID format: 20xxxxPSxxxxH',
                icon: 'error',
                confirmButtonText: 'retry'
              }).then((result) =>{
                if (result.isConfirmed) {    
                  window.location.replace("/signup")  
                }
            }
            )
        }

        if(params.role==='professor'&& (params.id[4]+params.id[9]!=='PH')){
            format=false
            Swal.fire({
                title: 'error',
                text: 'Professor ID format: 20xxPxxxxH',
                icon: 'error',
                confirmButtonText: 'retry'
              }).then((result) =>{
                if (result.isConfirmed) {    
                  window.location.replace("/signup")                        
                }
            }
            )
        }

        if(params.role==='admin'&& (params.id[4]+params.id[9]!=='AH')){
            format=false
            Swal.fire({
                title: 'error',
                text: 'Admin ID format: 20xxAxxxxH',
                icon: 'error',
                confirmButtonText: 'retry'
              }).then((result) =>{
                if (result.isConfirmed) {    
                  window.location.replace("/signup")                        
                }
            }
            )
        }

        if(!isEmpty && match_pass && format){
            console.log(" params " + params);
            axios.post('http://localhost:4000/app/signup',params)  
            .then(Response =>{            
                if (Response.status === 200) {                    
                    sessionStorage.setItem('role',params.role);
                    sessionStorage.setItem('id',params.id);
                    Swal.fire({
                        title: 'success',
                        text: "registered",
                        icon: 'success',
                        confirmButtonText: 'ok'
                      }).then((result) =>{
                          
                          if (result.isConfirmed) {    
                            if(params.role!='admin'){  
                            window.location.replace("/details")
                            }
                            else{
                                window.location.replace("/");
                            }                        
                          }
                        
                      }
                      )
                }else if(Response.status===404){
                    console.log("error in post");
                    Swal.fire({
                        title: 'error',
                        text: "error",
                        icon: 'error',
                        confirmButtonText: 'ok'
                      })
                    window.location.replace('/signup')
                }
            })
        }
    }
    

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
                    <select id="role" name="role" style={{marginLeft: '20px'}}>
                        <option value="student">Student</option>
                        <option value="professor">Professor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" onClick={this.signup} className="btn btn-primary btn-block" >Sign Up</button>
                
            </form>
            </div>
            </div>
        );
    }
}

export default SignUp;