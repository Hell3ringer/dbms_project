import React, { Component } from 'react';

import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class TopnavAdmin extends Component{
    Logout(){
        sessionStorage.clear();
        localStorage.clear()
    }
    render(){
        return(
            <div id="nav_id" className="topnav navbar nav-pills fixed-top navbar-dark bg-dark">          
                <a href="/dashboard_admin">Dashboard</a>
                <span className="navbar-text cfs-class">Course Feedback System CFS</span>
                {/* <a href="/contact">Contact</a> */}
                <a href="/about">About</a>
                <a className="active" href="/" onClick={this.Logout}>Logout</a>
            </div>  
        )
    }
}
export default TopnavAdmin;