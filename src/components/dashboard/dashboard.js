import React, { Component } from 'react';
import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Topnav from './topnav';
import Sidebar from './sidebar';

class dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            courses:[],
            s_id: localStorage.getItem('loginID') 
        }
    }
    
    Logout(){
        sessionStorage.clear();
        localStorage.clear()
    }
    
    getCourses(){
        const student={s_id:this.state.s_id};
        axios.post('http://localhost:4000/app/registered_courses',{student})
        .then(res=>{
            this.setState({courses:res.data})
        })
    }
    componentDidMount(){
        document.getElementById("hello_sid").innerHTML='Welcome '+this.state.s_id;
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

                <Topnav/>
                <Sidebar/>   
                <div id="side_main_box"> 
                <div> 
            
                    <h2 id="hello_sid">Hi</h2><br></br>
                    <h5>Your registered courses:</h5>
                    <table id="courses_table" className="table table-bordered table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th>Course ID</th>
                                <th>Course name</th>
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
