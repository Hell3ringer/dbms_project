import '../stylesheets/login_component.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
//const Swal = require('sweetalert2')
var isEmpty = false;


export default class Login extends Component {

    signin(Event){
        Event.preventDefault()
    
        const params = {
            id : document.getElementById('idNo').value,
            pass : document.getElementById('password').value
            
        }
    
        if (params.id === "" || params.pass === "") {
            isEmpty = true;
            Swal.fire({
                title: 'error',
                text: "Don't leave empty!!",
                icon: 'error',
                confirmButtonText: 'retry'
              }).then((result) =>{
                  if (result.isConfirmed) {
                      window.location.replace('/login')
                  }
              }
              )
        }
        
        if (!isEmpty) {
            axios.get('http://localhost:5000/app/login',{
                params : {
                    id : document.getElementById('idNo').value,
                    pass : document.getElementById('password').value
                }
        })
            .then(Response => {
                if (Response.status === 200) {
                    console.log("successfully logged in");
                    Swal.fire({
                        title: 'success',
                        text: "login",
                        icon: 'success',
                        confirmButtonText: 'ok'
                      }).then((result) =>{
                          if (result.isConfirmed) {      
    
                            window.location.replace("/dashboard")                        
                              
                          }
                      }
                      )
                } else if (Response.status === 201) {
                    console.log("incorrect password");
                    Swal.fire({
                        title: 'error',
                        text: "incorrect password!",
                        icon: 'error',
                        confirmButtonText: 'retry'
                      }).then((result) =>{
                          if (result.isConfirmed) {      
    
                            window.location.replace("/login")                        
                              
                          }
                      }
                      )
                }else if (Response.status === 202) {
                    console.log("no users");
                    Swal.fire({
                        title: 'error',
                        text: "no users!",
                        icon: 'error',
                        confirmButtonText: 'retry'
                      }).then((result) =>{
                          if (result.isConfirmed) {      
    
                            window.location.replace("/login")                        
                              
                          }
                      }
                      )
                }else{
                    console.log("error in post");
                }
            })
        }
    }

    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner ">
            <form className="container">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>id </label>
                    <input type="text" id = "idNo" className="form-control" placeholder="Enter id" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id = "password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" onClick ={this.signin} className="btn btn-primary btn-block">Submit</button>
               
                <br></br>
                <p>Don't have an account?    <Link to={'/signup'}>Sign up</Link></p>
            </form>
            </div>
            </div>
        );
    }
}