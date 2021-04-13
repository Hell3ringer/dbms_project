import React, { Component } from 'react'
import axios from 'axios'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'

// var id = localStorage.getItem("loginID")
class cms_student extends Component{
    constructor(props){
        super(props)
        this.state={
            s_id:'2019A7PS0155H',
            courses:[]
        }
    }
    
    componentDidMount(){
        document.getElementById("hello_sid").innerHTML='Hello '+this.state.s_id;
        this.getCourses();
    }
    componentDidUpdate(){
        // this.getCourses();
    }
    renderTableData(){
        console.log(this.state.courses);
        // this.getCourses();
        return this.state.courses.map((course,index)=>{
            const {c_id,c_name,handout,credits,mids,compre}=course
            return(
                <tr id={c_id}>
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    <td>{handout}</td>
                    <td>{credits}</td>
                    <td>{mids}</td>
                    <td>{compre}</td>
                    {/* {this.get_register(c_id)}
                    {this.get_td(c_id)} */}
                </tr>
            )
        })
    }
    render(){
        // this.getCourses();
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <Topnav/>
                <Sidebar/>
                <div className="side_main_box">
                    <h3 id="hello_sid"></h3>
                    <div>
                        <br></br>
                        <h3>CMS of registered courses</h3><br></br><br></br>
                        <div id="alert_reg"></div>
                        <table id="courses_table" className="table table-bordered table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th>Cid</th>
                                <th>Cname</th>
                                <th>Handout</th>
                                <th>Credits</th>
                                <th>Mid-Sem Date</th>
                                <th>Compre Date</th>
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
    getCourses(){
        const student={s_id:this.state.s_id};
        console.log(student.s_id);
        axios.post('http://localhost:4000/app/registered_courses',{student})
        .then(res=>{
            this.setState({courses:res.data})
        })
    }
}
export default cms_student;