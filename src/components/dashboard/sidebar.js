import React, { Component } from 'react';

import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class sidebar extends Component{
    render(){
        return(
            <nav id="sidebar">
            <ul id="ul_id" className="list-unstyled components">
                {/* <li>
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                </li> */}
            <li><a href="/profile">My Profile</a></li>                            
            <li><a href="/register">Register into Courses</a></li>
            <li><a href="/give_feedback">Give Feedback</a></li>
            <li><a href="/view_all_feedbacks">View All Feedbacks</a></li>
            <li><a href="/cms_student">CMS</a></li>
            </ul>  
        </nav>
        )
    }
}

export default sidebar;