import React, { Component } from 'react'
import { withRouter } from 'react-router';
import Topnav_prof from '../dashboard/topnav_prof'
import Sidebar_prof from '../dashboard/sidebar_prof'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'

class profile_prof extends Component{
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <Topnav_prof/>
                <Sidebar_prof/>
                <div className="side_main_box">
                    <p>This is profile page OF PROFESSOR</p><br></br>
                    <p>window loc is {window.location.pathname}</p>
                </div>  
            </div>
        )
    }
}

export default withRouter(profile_prof)