import React, { Component } from 'react';

import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


var id = localStorage.getItem('loginID')
class view_students extends Component {

    Logout(){
        sessionStorage.clear();
        localStorage.clear()
    }
    
    render() {
        const styling={
            marginTop: "60px",
            marginLeft: "200%",
            display: "block",
            width: "100%",
        };
        return (
            <div className="entire_div_dashboard">        
                <div id="nav_id" className="topnav navbar nav-pills fixed-top navbar-dark bg-dark">          
                    <a href="/dashboard_prof">Dashboard</a>
                    <span className="navbar-text cfs-class">Course Feedback System  CFS</span>
                    <a href="/contact">Contact</a>
                    <a href="/about">About</a>
                    <a className="active" href="/" onClick={this.Logout}>Logout</a>
                </div>     

                
                    <nav id="sidebar">
                        <ul id="ul_id" className="list-unstyled components">
                           
                        <li><a href="/profile_prof">My Profile</a></li>                            
                        <li><a href="/my_courses">My Courses</a></li>
                        <li><a href="/my_feedbacks">View Feedbacks</a></li>
                        <li><a href="/cms_prof">Post on CMS</a></li>
                        </ul>  
                    </nav>
                    
                    <div id="side_main_box"> 
                    
                            <h2 id="hello_sid">Hey {id} you are viewing students of c_id</h2><br></br>
                            

                    </div>


                    {/* <div> 
                        <h1>see meeee</h1>
                    <p style={styling}><h2>Hey {id}! you are viewing students</h2></p>
                    </div> */}
            </div>
        )
    }
}
export default view_students;
