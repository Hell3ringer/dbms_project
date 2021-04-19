import React, { Component } from 'react'
import TopnavAdmin from '../dashboard/topnav_admin'
import SidebarAdmin from '../dashboard/sidebar_admin'


import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'



class verify_confirm extends Component{
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <TopnavAdmin/>
                <SidebarAdmin/>
                <div className="side_main_box">
                <h2>Student or Professor</h2>
                    
                    <button style={{marginLeft:"31%", marginTop:"10%"}} onClick={() => window.location.replace('/verify')}>Student</button>
                    <br></br><br></br>
                    <button style={{marginLeft:"31%", marginTop:"10%"}} onClick = {() => window.location.replace("/verify_prof")}>Professor</button><br></br>
                    {this.admin_verify()}
                </div>  
            </div>
        )
    }
    admin_verify(){
        if(localStorage.getItem('loginID')==='2019A0000H'){
            return(<button style={{marginLeft:"31%", marginTop:"10%"}} onClick={() => window.location.replace('/verify_admin')}>Admins</button>)
        }
    }
}

export default verify_confirm