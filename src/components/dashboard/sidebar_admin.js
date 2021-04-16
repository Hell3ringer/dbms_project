import React, { Component } from 'react';

import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Sidebar_admin extends Component{
    render(){
        return(
            <nav id="sidebar">
                    <ul id="ul_id" className="list-unstyled components">
                            {/* <li>
                                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                            </li> */}
                        {/* <li><a href="/profile_prof">My Profile</a></li>                             */}
                        <li id={window.location.pathname==="/modify_courses"?"active_tab":""}><a href="/modify_courses">Modify Courses</a></li>
                        <li id={window.location.pathname==="/show_prof"?"active_tab":""}><a href="/show_prof">Proffesors</a></li>
                        <li id={window.location.pathname==="/show_students"?"active_tab":""}><a href="/show_prof">Proffesors</a></li>
                        <li id={window.location.pathname==="/assign_prof"?"active_tab":""}><a href="/assign_prof">Assign Proffesors</a></li>
                        {/* <li><a href="#">Post on CMS</a></li> */}
                    </ul>  
            </nav>
        )
    }
}
export default Sidebar_admin