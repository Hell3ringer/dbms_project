import React, { Component } from 'react';
import { withRouter } from 'react-router';

import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class dashboard extends Component {

    // openNav() {
    //     document.getElementById("sidebar").style.width = "250px";
    //     document.getElementById("main").style.marginLeft = "250px";       
    // }
    
    
    // closeNav() {
    // document.getElementById("sidebar").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";}
    Logout(){
        document.cookie="jwt="+ ";" + "max-age=" + (0);
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
                    <a href="/dashboard">Dashboard</a>
                    <span className="navbar-text cfs-class">Course Feedback System  CFS</span>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                    <a className="active" href="/" onClick={this.Logout}>Logout</a>
                </div>     

                
                    <nav id="sidebar">
                        <ul id="ul_id" className="list-unstyled components">
                            {/* <li>
                                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                            </li> */}
                        <li><a href="/profile">My Profile</a></li>                            
                        <li><a href="#">Register into Courses</a></li>
                        <li><a href="#">Give Feedback</a></li>
                        <li><a href="#">View Feedback</a></li>
                        <li><a href="#">CMS</a></li>
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
                    <p style={styling}><h2>Hi student_id</h2></p>
                </div>
            </div>
        )
    }
}
export default dashboard;
