import React, { Component } from 'react'
import axios from 'axios'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'

function registration(){
    const user={
        id:document.getElementById('idNo').value,
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        contact_no:document.getElementById('contactNo').value
    }
    console.log("user input"+user)
    axios.post('http://localhost:5000/app/profile',user)
    .then(Response=>{
        console.log(Response);
    })
}

class profile extends Component{
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <Topnav/>
                <Sidebar/>
            <div className="auth-wrapper">
            <div className="auth-inner ">

                <h3>Modify Details</h3>

                <div className="form-group">
                    <label>id</label>
                    <input type="text" id = "idNo" className="form-control" placeholder="Enter id" />
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" id = "name" className="form-control" placeholder="Enter Name" />
                </div>

                <div className="form-group">
                    <label>Email id</label>
                    <input type="text" id = "email" className="form-control" placeholder="Enter Email id" />
                </div>

                <div className="form-group">
                    <label>Contact no</label>
                    <input type="text" id = "contactNo" className="form-control" placeholder="Enter Contact no" />
                </div>

                <button type="submit" onClick ={registration} className="btn btn-primary btn-block">Submit</button>
                <br></br>

            </div>
            </div>
            </div>
        )
    }
}

export default profile