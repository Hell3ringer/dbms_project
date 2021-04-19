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
    
        // if(params.id==='2019A0000H' && params.pass==='123'){
        //     const default_admin={
        //         id : params.id,
        //         pass : params.pass,
        //         role : 'admin'
                
        //     }
        //     axios.post('http://localhost:4000/app/signup',default_admin)
        //     .then(Response =>{
        //         window.location.replace('/dashboard_admin')
        //     })
        // }

        if (params.id === "" || params.pass === "") {
            isEmpty = true;            
            Swal.fire({
                title: 'error',
                text: "Don't leave empty!!",
                icon: 'error',
                confirmButtonText: 'retry'
              }).then((result) =>{
                  if (result.isConfirmed) {
                      isEmpty = false;
                      window.location.replace('/')
                  }
              }
              )
        }
        console.log("isEmpty " + isEmpty);
        if (!isEmpty) {

            axios.post('http://localhost:4000/app/login',params)
            .then(Response =>{
                console.log("response.status is " + Response.data);
                if(Response.data===-2){
                    Swal.fire({
                        title:'Account UnVerified',
                        text:'Sorry, Your verification is still pending, you cannot login now. Please try later',
                        confirmButtonText:'ok',

                    }).then((result)=>{
                            if(result.value){
                                window.location.replace('/')
                            }
                        })
                }
                if (Response.data === 1) {
                    Swal.fire({
                        toast:true,
                        title: 'signed in successfully',                        
                        icon: 'success',
                        timer:2000,
                        timerProgressBar:true,                        
                        position:'top-end',                        
                        showConfirmButton:false,                        
                      }).then((result) =>{
                          if (result.dismiss) {      
                            
                            var role = params.id[4]+params.id[9]
                            console.log(role);
                            localStorage.setItem('loginID',params.id);
                            if (role === "AH") {
                                window.location.replace("/dashboard_admin")     
                            }else if(role === "PH"){
                                window.location.replace("/dashboard_prof")     
                            }else if(params.id[6]+params.id[7]==="PS"){
                                window.location.replace("/dashboard")   
                            }else{
                                Swal.fire({
                                    title: 'error',
                                    text: "check format",
                                    icon: 'error',
                                    confirmButtonText: 'retry'
                                  })
                            }
                          }
                      }
                      )
                }else if (Response.data === 2) {
                    Swal.fire({
                        title: 'error',
                        text: "incorrect password!",
                        icon: 'error',
                        confirmButtonText: 'retry'
                      }).then((result) =>{
                          if (result.isConfirmed) {      
                            window.location.replace("/")                        
                          }
                      }
                      )
                }else if (Response.data === -1) {
                    Swal.fire({
                        title: 'error',
                        text: "user dosen't exist!",
                        icon: 'error',
                        confirmButtonText: 'retry'
                      }).then((result) =>{
                          if (result.isConfirmed) {      
    
                            window.location.replace("/")                        
                              
                          }
                      }
                      )
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

                <button type="submit" onClick ={this.signin} className="btn btn-primary btn-block">Sign in</button>
               
                <br></br>
                <p>Don't have an account?    <Link to={'/signup'}>Sign up</Link></p>
            </form>
            </div>
            </div>
        );
    }
}