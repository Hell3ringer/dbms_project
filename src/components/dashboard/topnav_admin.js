import React, { Component } from 'react';
import { withRouter } from 'react-router';

import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class topnav_admin extends Component{
    render(){
        return(
            <div id="nav_id" className="topnav navbar nav-pills fixed-top navbar-dark bg-dark">          
                <a href="/dashboard_admin">Dashboard</a>
                <span className="navbar-text cfs-class">Course Feedback System CFS</span>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
                <a className="active" href="/" onClick={this.Logout}>Logout</a>
            </div>  
        )
    }
}
export default topnav_admin;