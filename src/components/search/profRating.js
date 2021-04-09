import React, { Component } from 'react';
import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
const Swal = require('sweetalert2')


function profRating(){
    
        axios.post('http://localhost:4000/app/profRating',)
        .then(Response =>{
            if (Response.status === 200) {
                console.log(Response.data);

                if(Response.data.length===0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No data!',
                      })
                    }
                    else{
                        const p_id = Response.data[0].p_id
                        const p_name = Response.data[0].p_name
                        const p_rating = Response.data[0].p_rating

                        console.log(p_id, p_name, p_rating);
                        alert(Response.data)
                    }
                
                
            }
        })
    }


class ProfRating extends Component{
    render() {
        
        return(
            <div>prof rating</div>
            // {profRating}

            // <div> 
            //     <div className="form-group">
            //             <input type="text" id="p_rating" className="form-control" placeholder="Search by course name..." />
            //     </div>
            //     <button type="submit" onClick={searchCourse} className="btn btn-primary btn-block" >Search</button>

            // </div>
        )
    }
}

export default ProfRating