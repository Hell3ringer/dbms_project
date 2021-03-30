import React, { Component } from 'react';
import { withRouter } from 'react-router';

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
                        <li><a href="#">Modify Courses</a></li>
                        <li><a href="#">Modify Proffesors</a></li>
                        <li><a href="#">Assign Proffesors</a></li>
                        {/* <li><a href="#">Post on CMS</a></li> */}
                    </ul>  
            </nav>
        )
    }
}
export default sidebar_admin