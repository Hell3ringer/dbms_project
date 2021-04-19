import React, { Component } from 'react'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'

class view_feedbacks_student extends Component{
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <Topnav/>
                <Sidebar/>
                <div className="side_main_box"><br></br>
                    <h4>View feedbacks of Courses and Professors</h4>
                    <button onClick={()=>{
                        window.location.href="/show_all_courses"
                    }} style={{marginLeft:"31%", marginTop:"10%"}}>Search w.r.t Courses</button>
                    <br></br><br></br>
                    <button onClick={()=>{
                        window.location.href="/view_feedback_prof_to_student"
                    }} style={{marginLeft:"30%", marginTop:"10%"}}>Search w.r.t Professors</button>
                </div>
            </div>
        )
    }
}
// function func() {
//     window.location.replace("/view_feedback_course")
// }
// function func2(){
//     window.location.replace("/view_feedback_prof_to_student")
// }
export default view_feedbacks_student