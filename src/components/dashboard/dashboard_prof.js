import React, { Component } from 'react';
import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TopnavProf from '../dashboard/topnav_prof'
import SidebarProf from './sidebar_prof';


var id = localStorage.getItem('loginID')
class dashboard_prof extends Component {
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
                <TopnavProf/>
                <SidebarProf/>
                <div>
                    <p style={styling}><h2>Welcome {id}</h2></p>
                </div>
            </div>
        )
    }
}
export default dashboard_prof;
