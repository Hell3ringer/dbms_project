import React, { Component } from 'react'
import axios from 'axios'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'
var id = localStorage.getItem("loginID")
class profile_prof extends Component{
    constructor(props){
        super(props)
        this.state={
            id:id,
            details:[]
        }
    }
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

                
                <button onClick={modify}>Modify</button>

            </div>
            </div>
            </div>
        )
    }
    getDetails(){
        const prof={p_id:this.state.id}
        axios.post('http://localhost:4000/app/get_prof_details',{prof})
        .then(res=>{
            this.setState({details:res.data})
            // console.log(this.state.details);
            var x;
        for(var d in res.data){
            x=res.data[d];
        }
                        document.getElementById("idNo").setAttribute("value",x['p_id']);
                        document.getElementById("idNo").setAttribute("readonly","");
                        document.getElementById("name").setAttribute("value",x['p_name']);
                        document.getElementById("email").setAttribute("value",x['p_email']);
                        document.getElementById("contactNo").setAttribute("value",x['p_contact_no']);
        })
        

    }

componentDidMount(){
        this.getDetails();
    }
}

function modify(){
    const prof={
        id:document.getElementById("idNo").value,
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        contact_no:document.getElementById("contactNo").value,
    }
    console.log(prof);
    axios.post('http://localhost:4000/app/modify_prof',{prof})
    .then(Response=>{
        if(Response.status===200){
            document.getElementById("after_modify").innerHTML="Succesfully modified"
        }
    })
    window.location.replace('/dashboard_prof')
}

export default profile_prof