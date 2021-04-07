import React, { Component } from 'react';

import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class sidebar_admin extends Component{
    render(){
        return(
            <nav id="sidebar">
                    <ul id="ul_id" className="list-unstyled components">
                            {/* <li>
                                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                            </li> */}
                        {/* <li><a href="/profile_prof">My Profile</a></li>                             */}
                        <li id={window.location.pathname==="/modify_courses"?"active_tab":""}><a href="/modify_courses">Modify Courses</a></li>
                        <li id={window.location.pathname==="/modify_prof"?"active_tab":""}><a href="/modify_prof">Modify Proffesors</a></li>
                        <li id={window.location.pathname==="/assign_prof"?"active_tab":""}><a href="/assign_prof">Assign Proffesors</a></li>
                        {/* <li><a href="#">Post on CMS</a></li> */}
                    </ul>  
            </nav>
        )
    }
}
export default sidebar_admin