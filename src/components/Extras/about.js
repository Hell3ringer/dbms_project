import React, { Component } from 'react';
// import Topnav from '../dashboard/topnav'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class about extends Component{
    render(){
        return(
                <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <div id="nav_id" className="topnav navbar nav-pills fixed-top navbar-dark bg-dark">          
                {/* <a href="/dashboard">Dashboard</a> */}
                <span className="navbar-text cfs-class" style={{marginLeft:"40%"}}>Course Feedback System CFS</span>
                <a href="/contact">Contact</a>
                <a href="/about">About</a>
                <a className="active" href="/" onClick={this.Logout}>Logout</a>
                </div>
                <div style={{marginLeft:"15%",marginRight:"15%",marginTop:"15%"}}>
                    This site is for collecting feedbacks for the courses and professors individually and show them to the students to help them choose courses and professors.
                </div>
                </div>
        )
    }
}
export default about;