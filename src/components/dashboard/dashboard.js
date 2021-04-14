import React, { Component } from 'react';
import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

var id = localStorage.getItem('loginID')
class dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            courses:[],
            s_id:'2019A7PS0155H'    //HARD-CODED HERE
        }
    }
    // openNav() {
    //     document.getElementById("sidebar").style.width = "250px";
    //     document.getElementById("main").style.marginLeft = "250px";       
    // }
    
    
    // closeNav() {
    // document.getElementById("sidebar").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";}
    Logout(){
        // document.cookie="jwt="+ ";" + "max-age=" + (0);
        sessionStorage.clear();
        localStorage.clear()
    }
    
    getCourses(){
        const student={s_id:this.state.s_id};
        //console.log(student.s_id);
        axios.post('http://localhost:4000/app/registered_courses',{student})
        .then(res=>{
            this.setState({courses:res.data})
        })
    }
    componentDidMount(){
        document.getElementById("hello_sid").innerHTML='Hello '+this.state.s_id;
        this.getCourses();
    }
    renderTableData(){

        console.log(this.state.courses);
        return this.state.courses.map((course,index)=>{
            const {c_id,c_name}=course
            return(
                <tr id={c_id}>
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    <td><button>Give feedback</button></td>
                </tr>
            )
        })
    }
    render() {
        // const styling={
        //     marginTop: "60px",
        //     marginLeft: "200%",
        //     display: "block",
        //     width: "100%",
        // };
        return (
            <div className="entire_div_dashboard">        
                <div id="nav_id" className="topnav navbar nav-pills fixed-top navbar-dark bg-dark">          
                    <a href="/dashboard">Dashboard</a>
                    <span className="navbar-text cfs-class">Course Feedback System  CFS</span>
                    <a href="/contact">Contact</a>
                    <a href="/about">About</a>
                    <a className="active" href="/" onClick={this.Logout}>Logout</a>
                </div>     

                
                    <nav id="sidebar">
                        <ul id="ul_id" className="list-unstyled components">
                            {/* <li>
                                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                            </li> */}
                        <li><a href="/profile">My Profile</a></li>                            
                        <li><a href="/register">Register/Unenroll from Courses</a></li>
                        <li><a href="/give_feedback">Give Feedback</a></li> 
                        <li><a href="/view_all_feedbacks">All Courses</a></li>
                        <li><a href="/cms_student">CMS</a></li>
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
                <div id="side_main_box"> 
                <div> 
            
                    <h2 id="hello_sid">Hi</h2><br></br>
                    <h5>Your registered courses:</h5>
                    <table id="courses_table" className="table table-bordered table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th>Course ID</th>
                                <th>Course name</th>
                                <th>Give feedback</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                </div>

            </div>
            </div>
        )
    }
}
export default dashboard;
