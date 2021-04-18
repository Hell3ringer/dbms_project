import React, { Component } from 'react'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'



class modify_courses extends Component{
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <Topnav/>
                <Sidebar/>
                <div className="side_main_box">
                    {/* <p>Modify Courses Here</p><br></br>
                    <p>Like add or delete courses and kavalante handout kuda ikkade ivvochu</p><br></br>
                    <p>window loc is {window.location.pathname}</p> */}    
                    <br></br>
                    <h3>Give feedbacks  Courses/Professors</h3>
                    
                    <button style={{marginLeft:"31%", marginTop:"10%"}} onClick={() => window.location.replace('/course_give_feedback')}>Courses</button>
                    <br></br><br></br>
                    <button style={{marginLeft:"31%", marginTop:"10%"}} onClick = {() => window.location.replace("/professor_give_feedback")}>Professor</button>
                    
                   
                        
                    </div>
                </div>  
            
        )
    }
    
}



export default modify_courses