import React, { Component } from 'react';
// import Topnav from '../dashboard/topnav'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class about extends Component{
    dash(){
        var id = localStorage.getItem('loginID')
        var role = id[4]+id[9]
        if (role === "AH") {
            window.location.replace("/dashboard_admin")     
        }else if(role === "PH"){
            window.location.replace("/dashboard_prof")     
        }else if(id[6]+id[7]==="PS"){
            window.location.replace("/dashboard")   
        }
    }
    render(){
        return(
                <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <div id="nav_id" className="topnav navbar nav-pills fixed-top navbar-dark bg-dark">          
                {/* <a href="/dashboard">Dashboard</a> */}
                <a onClick={this.dash}>Dashboard</a>
                <span className="navbar-text cfs-class" style={{marginLeft:"40%"}}>Course Feedback System CFS</span>
                <a href="/contact">Contact</a>
                <a href="/about">About</a>
                <a className="active" href="/" onClick={this.Logout}>Logout</a>
                </div>

                <div style={{marginLeft:"15%",marginRight:"15%",marginTop:"15%"}}>
                    {/* This site is for collecting feedbacks for the courses and professors individually and show them to the students to help them choose courses and professors. */}
                    <>
  
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-black.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
 

  <div className="w3-display-container w3-animate-opacity">
    <img src="https://www.bits-pilani.ac.in/Uploads/Hyderabad/adminforhyderabad/Gallery/2015-6-25--15-1-11-412_audi1.JPG" alt="boat" style={{width: '100%', minHeight: 250, maxHeight: 400}} />
    <p>




    </p>
  </div>

  {/* Work Row */}
  <div className="w3-container w3-padding-16 w3-theme-l4" id="work">
    <div className="w3-col.m12">
      <h2>Our Work: Course Feedback System</h2>
      <p>Our project is to create a web portal to share and view reviews about the courses offered at the university. Through the Course Feedback System, each student can give feedback, rating to any number of professors and each professor can have feedback, rating from any number of students as long as they were taught by him/her in the previous semester. The student has s_id(unique), s_name, s_email, s_contact_no as attributes. The professor has p_id(unique), p_name, p_email, p_contact_no, p_rating as attributes. Each student can have at least 1 course and at most 9 courses whereas each course can have any number of students from 0 to 300. Each student has to register for their respective courses (on the website). Students can view feedback and rating of any course or professor. Students can give feedback, rating to courses they opted for and a course can have feedback, rating from any number of students. Each course has c_id (unique), c_name, c_rating, credits, information as attributes. The information contains handouts and test dates (mid-semester, comprehensive). Each course can be taught by at most 3 professors and can have 0 professors at a given time. Each professor can teach 0 to 4 courses. Student can only give a rating and not feedback if he chooses so. Students can view information on the respective registered courses. </p>
    </div>
  </div>

    {/* Team Container */}
    <div className="w3-container w3-padding-small w3-center" id="team">
    <h2>OUR TEAM</h2>
    <div className="w3-row"><br />
      <div className="w3-quarter">
        <h3>Vamshi</h3>
        <p>2019A7PS0095H</p>
      </div>
      <div className="w3-quarter">
        <h3>Kedarnath</h3>
        <p>2019A7PS0155H</p>
      </div>
      <div className="w3-quarter">
        <h3>Abhigna</h3>
        <p>2019A7PS0047H</p>
      </div>
      <div className="w3-quarter">
        <h3>Bharath</h3>
        <p>2019A7PS0098H</p>
      </div>
      </div>
    </div>

  
  
  
</>

                
                </div>
                </div>

        )
    }
}
export default about;