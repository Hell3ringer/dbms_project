import React, { Component } from 'react'
import axios from 'axios'
function registration(){
    const user ={
        id:document.getElementById('idNo').value,
        name:document.getElementById('name').value ,
        email: document.getElementById('email').value,
        contact_no: document.getElementById('contactNo').value
    }
    

    axios.post('http://localhost:5000/app/professorDetails',user)
    .then(Response => {    
        console.log("got response from backend " + Response.data);
        window.location.replace('/')
    })

}

 class professorDetails extends Component {
    render() {
        return (
            <div>
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
                    <input type="text" id = "email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Contact No</label>
                    <input type="text" id = "contactNo" className="form-control" placeholder="Enter contact no" />
                </div>

                <button type="submit" onClick={registration} className="btn btn-primary btn-block">Submit</button>
               
                <br></br>
                
            </form>
            </div>
            </div>
            </div>
        )
    }
}

export default professorDetails
