import '../stylesheets/login_component.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
//const Swal = require('sweetalert2')
var isEmpty = false;
function signin(){
    
    const params = {
        id : document.getElementById('idNo').value,
        pass : document.getElementById('password').value
        
    }

    if (params.id === "" || params.pass === "") {
        isEmpty = true;
        console.log("isEmpty");
        Swal.fire({
            title : "empty",
            
        });
    }
    
    if (!isEmpty) {
        axios.get('http://localhost:4000/app/login',{
            params : {
                id : document.getElementById('idNo').value,
                pass : document.getElementById('password').value
            }
    })
        .then(Response => {
            if (Response.status === 200) {
                console.log("successfully logged in");
            } else if (Response.status === 201) {
                console.log("incorrect password");
            }else if (Response.status === 202) {
                console.log("no users");
            }else{
                console.log("error in post");
            }
        })
    }
}

export default class Login extends Component {

    

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

                <button type="submit" onClick ={signin} className="btn btn-primary btn-block">Submit</button>
               
                <br></br>
                <p>Don't have an account?    <Link to={'/signup'}>Sign up</Link></p>
            </form>
            </div>
            </div>
        );
    }
}