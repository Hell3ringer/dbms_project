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

                <div id="nav_id" className="topnav navbar nav-pills fixed-top navbar-dark bg-dark">          
                    <a href="/dashboard_admin">Dashboard</a>
                    <span className="navbar-text cfs-class">Course Feedback System  CFS</span>
                    <a href="/contact">Contact</a>
                    <a href="/about">About</a>
                    <a className="active" href="/" onClick={this.Logout}>Logout</a>
                </div>     

                
                    <nav id="sidebar">
                        <ul id="ul_id" className="list-unstyled components">
                            
                        {/* <li><a href="/profile_prof">My Profile</a></li>                             */}
                        <li><a href="/modify_courses">Modify Courses</a></li>
                        <li><a href="/modify_prof">Modify Proffesors</a></li>
                        <li><a href="/assign_prof">Assign Proffesors</a></li>
                        <li><a href="/verify_confirm">Verify</a></li>
                        {/* <li><a href="#">Post on CMS</a></li> */}
                        </ul>  
                    </nav>
                    
                        {/* <div id="main">

                        <button id="sidebarCollapse" className="openbtn btn btn-info" onClick={this.openNav}>&#9776;</button>
                            <form>
                                <p>
                                    isjfiowjviwvmkwvomeiorvjmeroivje
                                </p>
                                <p>
                                    ksefoiewmfnoiewjvmweopigvmew
                                </p>
                            </form>
                           
                        </div> */}

                    <div> 
                    <p style={styling}><h2>Hi {id}</h2></p>
                    </div>
            </div>
        )
    }
}
export default dashboard_admin;
