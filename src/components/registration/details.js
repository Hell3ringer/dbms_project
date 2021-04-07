import React, { Component } from 'react'
import axios from 'axios'
const Swal = require('sweetalert2')

var isEmpty = false;


class details extends Component {

    register(Event){
        Event.preventDefault()    
        var role = sessionStorage.getItem('role');     
        const user = {
            id : document.getElementById('idNo').value,
            name : document.getElementById('name').value,
            email : document.getElementById('email').value,
            contact_no : document.getElementById('contactNo').value  , 
            role : role        
        }
        
        console.log("params in details " + JSON.stringify(user,null,2));
        if (user.id === ''||user.name === ''||user.email === '' || user.contactNo === '') {
            isEmpty = true;           
            Swal.fire({
                title: role,
                text: "Don't leave empty!!",
                icon: 'error',
                confirmButtonText: 'retry'
              }).then((result) =>{
                  if (result.isConfirmed) {
                      window.location.replace('/details')
                  }
              }
              )
        }
        if(!isEmpty){
            axios.post('http://localhost:5000/app/details',user          
            ).then(Response => {
                if (Response.status === 200) {
                    console.log("Response " + Response);
                    
                    window.location.replace('/');
                }else{
                    console.log("error in post ");
                    
                    window.location.replace('/details');
                }
            })
        }
    }

    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner ">
            <form className="container">
                <h3>Details</h3>

                <div className="form-group">
                    <label>id </label>
                    <input type="text" id = "idNo" className="form-control" placeholder="Enter id" />
                </div>
                <div className="form-group">
                    <label>name </label>
                    <input type="text" id = "name" className="form-control" placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label>email </label>
                    <input type="email" id = "email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>contact No </label>
                    <input type="number" pattern="[0-9]{10}" id = "contactNo" className="form-control" placeholder="Enter contact no" />
                </div>


                <button  onClick ={this.register} className="btn btn-primary btn-block">Submit</button>
               
                <br></br>
                
            </form>
            </div>
            </div>
        )
    }
}

export default details
