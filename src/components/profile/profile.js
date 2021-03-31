import React, { Component } from 'react'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'


class profile extends Component{
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <Topnav/>
                <Sidebar/>
                <div className="side_main_box">
                    <p>This is profile page OF STUDENT</p><br></br>
                    <p>window loc is {window.location.pathname}</p>
                </div>  
            </div>
        )
    }
}

export default profile