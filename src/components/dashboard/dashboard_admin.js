import React, { Component } from 'react';

import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TopnavAdmin from './topnav_admin';
import SidebarAdmin from './sidebar_admin';

var id = localStorage.getItem('loginID')

class dashboard_admin extends Component {
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
                <TopnavAdmin/>   
                <SidebarAdmin/>
            <div> 
                    <p style={styling}><h2>Hi {id}</h2></p>
                    </div>
            </div>
        )
    }
}
export default dashboard_admin;
