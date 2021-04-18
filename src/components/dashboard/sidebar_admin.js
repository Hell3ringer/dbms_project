import React, { Component } from 'react';

import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class SidebarAdmin extends Component{
    render(){
        return(
            <nav id="sidebar">
                    <ul id="ul_id" className="list-unstyled components">
                        <li id={window.location.pathname==="/modify_courses"?"active_tab":""}><a href="/modify_courses">Modify Courses</a></li>
                        <li id={window.location.pathname==="/show_prof"?"active_tab":""}><a href="/show_prof">Proffesors</a></li>
                        <li id={window.location.pathname==="/show_students"?"active_tab":""}><a href="/show_students">Students</a></li>
                        <li id={window.location.pathname==="/assign_prof"?"active_tab":""}><a href="/assign_prof">Assign Proffesors</a></li>
    <li id={window.location.pathname==="/verify_confirm"?"active_tab":""}><a href="/verify_confirm">Verify</a></li>
                        {/* <li><a href="#">Post on CMS</a></li> */}

                    </ul>  
            </nav>
        )
    }
}
export default SidebarAdmin