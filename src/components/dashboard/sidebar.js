import React, { Component } from 'react';

import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Sidebar extends Component{
    render(){
        return(
            <nav id="sidebar">
            <ul id="ul_id" className="list-unstyled components">
                {/* <li>
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                </li> */}
            <li id={window.location.pathname==="/profile"?"active_tab":""}><a href="/profile">My Profile</a></li>                            
            <li id={window.location.pathname==="/register"?"active_tab":""}><a href="/register">Register Courses</a></li>
             <li id={window.location.pathname==="/give_feedback"?"active_tab":""}><a href="/give_feedback">Give Feedback</a></li> 
            <li id={window.location.pathname==="/view_all_feedbacks"?"active_tab":""}><a href="/view_all_feedbacks">All Courses</a></li>
            {/* <li id={window.location.pathname==="/cms_student"?"active_tab":""}><a href="/cms_student">Extra Details</a></li> */}
            </ul>  
        </nav>
        )
    }
}
export default Sidebar;