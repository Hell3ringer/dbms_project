import React, { Component } from 'react';
import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
const Swal = require('sweetalert2')


function searchCourse(){
    var isEmpty = false;
    const params = {
        c_name : document.getElementById('searchinput').value
    }
    console.log(params.c_name);
    if (document.getElementById('searchinput').value === '') {
        isEmpty = true;
    }
    
    if (isEmpty) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The search box is empty!',
          })
    }else{
        axios.post('http://localhost:4000/app/searchCourse',params)
        .then(Response =>{
            if (Response.status === 200) {
                console.log(Response.data);

                if(Response.data.length===0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No such course!',
                      })
                    }
                    else{
                        const c_id = Response.data[0].c_id
                        const c_name = Response.data[0].c_name
                        const credits = Response.data[0].credits

                        console.log(c_id, c_name, credits);
                        alert(Response.data)
                    }
                
                
            }
        })
    }
}

class Search extends Component{
    render() {
        
        return(
            // <div> 
            //     <div class="input-group rounded">
            //         <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
            //             aria-describedby="search-addon" />
            //         <span class="input-group-text border-0" id="search-addon">
            //             <i class="fas fa-search"></i>
            //         </span>
            //     </div>
            // </div>
            <div className='searchBox'>
                <div className="form-group">
                        <input type="text" id="searchinput" className="form-control" placeholder="Search by course name..." />
                </div>
                <button type="submit" onClick={searchCourse} className="btn btn-primary btn-block" >Search</button>

            </div>
        )
    }
}

export default Search