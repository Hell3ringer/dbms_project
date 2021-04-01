import '../stylesheets/login_component.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

import React, { Component } from "react";
import { Link } from 'react-router-dom';
const Swal = require('sweetalert2')
var isEmpty = false;
function signin(){
    
    const params = {
        id : document.getElementById('id').value,
        pass : document.getElementById('password').value
        
    }

    if (params.id === ''||params.pass === '') {
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
        axios.post('http://localhost:4000/app/login',{params})
        .then(Response =>{
            if (Response.status === 200) {
                Swal.fire({
                    title: 'success',
                    text: "registered",
                    icon: 'success',
                    confirmButtonText: 'ok'
                  }).then((result) =>{
                      if (result.isConfirmed) {
                          window.location.replace('/')
                      }
                  }
                  )
            }else if(Response.status === 201){
                Swal.fire({
                    title: 'error',
                    text: "wrong password",
                    icon: 'error',
                    confirmButtonText: 'ok'
                  }).then((result) =>{
                      if (result.isConfirmed) {
                          window.location.replace('/')
                      }
                  }
                  )
            }else{
                Swal.fire({
                    title: 'error',
                    text: "no user",
                    icon: 'error',
                    confirmButtonText: 'ok'
                  }).then((result) =>{
                      if (result.isConfirmed) {
                          window.location.replace('/')
                      }
                  }
                  )
            }
        })
    }}

export default class Login extends Component {

    

    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner ">
            <form className="container">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>id </label>
                    <input type="text" id = "id" className="form-control" placeholder="Enter id" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id = "password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" onClick ={signin} className="btn btn-primary btn-block">Submit</button>
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