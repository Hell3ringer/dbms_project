import React, { Component } from 'react'
import TopnavAdmin from '../dashboard/topnav_admin'
import SidebarAdmin from '../dashboard/sidebar_admin'
import axios from 'axios'
import Select from 'react-select'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'

class change_date extends Component{
    render(){
        return(   
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <TopnavAdmin/>
                <SidebarAdmin/>
            </div>
        )
    }
}
export default change_date