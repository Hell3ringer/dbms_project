import React, { Component } from 'react'
import axios from 'axios'
const Swal = require('sweetalert2')

var isEmpty = false;
function register(){
    const params = {
        id : document.getElementById('id').value,
        name : document.getElementById('name').value,
        email : document.getElementById('email').value,
        contactNo : document.getElementById('contactNo').value
    }

    if (params.id === ''||params.name === ''||params.email === '' || params.contactNo === '') {
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
        axios.post('http://localhost:4000/app/details',{
            params : {
                id : document.getElementById('id').value,
                pass : document.getElementById('password').value,
                role : document.getElementById('role').value
            }
        }).then(Response => {
            if (Response.status === 200) {
                window.location.replace('/');
            }
        })
    }
}

export class studentDetails extends Component {
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
                    <input type="text" id = "name" className="form-control" placeholder="Enter id" />
                </div>
                <div className="form-group">
                    <label>email </label>
                    <input type="email" id = "email" className="form-control" placeholder="Enter id" />
                </div>
                <div className="form-group">
                    <label>contact No </label>
                    <input type="number" pattern="[0-9]{10}" id = "contactNo" className="form-control" placeholder="Enter id" />
                </div>


                <button type="submit" onClick ={register} className="btn btn-primary btn-block">Submit</button>
               
                <br></br>
                
            </form>
            </div>
            </div>
        )
    }
}

export default studentDetails
