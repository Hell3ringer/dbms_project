import React, { Component } from 'react'
import axios from 'axios'
import Topnav from '../dashboard/topnav';
import Sidebar from '../dashboard/sidebar';

export class CourseGiveFeedback extends Component {
    constructor(props){
        super(props);
        this.state={
            courses:[],
            s_id: localStorage.getItem('loginID')  
        }
    }
    getCourses(){
        const student={s_id:this.state.s_id};
        console.log(student.s_id);
        axios.post('http://localhost:4000/app/registered_courses',{student})
        .then(res=>{
            this.setState({courses:res.data})
        })
    }
    componentDidMount(){
       // document.getElementById("hello_sid").innerHTML='Hello '+this.state.s_id;
        this.getCourses();
    }
    redirectToFeedback(c_id){
        sessionStorage.setItem('cID',c_id);
        console.log("cid id " + c_id);
        window.location.replace('/feedback');

    }
    renderTableData(){

        console.log(this.state.courses);
        return this.state.courses.map((course,index)=>{
            const {c_id,c_name}=course
            
            return(
                
                <tr id={c_id}  >
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    <td><button onClick={() => this.redirectToFeedback(course.c_id)} >feedback</button></td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="entire_div_profile">
                <Topnav />
                <Sidebar />
                <div id="side_main_box"> 
                <div> 
                    <h5>Your registered courses:</h5>
                    <table id="courses_table" className="table table-bordered table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th>Course ID</th>
                                <th>Course name</th>
                                <th>Feedback</th>
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

export default CourseGiveFeedback
