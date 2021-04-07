import React, { Component } from 'react'
// import ReactTable from 'react-table'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'
import axios from 'axios';

// async function getCourses(){
//     let res=await axios.get('http://localhost:4000/app/courses')
//     let data=res.data
//     return data;
// }
// function axiosTest (populateData) {
//     axios.get('http://localhost:4000/app/courses')
//    .then(function(response){
//            populateData(response.data);
//     })
//     .catch(function(error){
//            console.log(error);
//      });
// }   
class courses_table extends Component{
    constructor(props){
        super(props)
        this.state={
            courses:[],
            id:'',
            enrolled_courses:[],
            s_id:'2019A7PS0155H'    //HARD-CODED HERE
        }
    }
    getCourses(){
        axios.get('http://localhost:4000/app/courses')
        .then(res=>{
            this.setState({courses:res.data})
        })
    }
    getEnrolledCourses(){
        const student={s_id:this.state.s_id}
        console.log(student.s_id);
        axios.post('http://localhost:4000/app/registered_courses',{student})
        .then(Response=>{
            this.setState({enrolled_courses:Response.data});
            console.log("log data"+JSON.stringify(Response.data));
        })
    }
    componentDidMount(){
        this.getCourses();
        this.getEnrolledCourses();
    }
    get_td(c_id){
        // console.log(this.state.enrolled_courses);
        
        for(var d in this.state.enrolled_courses){
            // console.log(d);
            // console.log(this.state.enrolled_courses[d]);
            let x=this.state.enrolled_courses[d];
            // console.log(x['c_id']);
            if(c_id===x['c_id']){
                return(<td><button onClick={()=>{
                    const pair={c_id:c_id,s_id:this.state.s_id}
                    axios.post('http://localhost:4000/app/delete_registered_course',{pair})
                    .then(Response=>{
                        if(Response.status===200){
                            document.getElementById("alert_reg").innerHTML="Unenrolled from "+c_id;
                        }
                    })
                }}>Unenroll</button></td>)
            }
        }
        
    }
    get_register(c_id){
        var count=0;
        for(var d in this.state.enrolled_courses){
            // console.log(d);
            // console.log(this.state.enrolled_courses[d]);
            let x=this.state.enrolled_courses[d];
            // console.log(x['c_id']);
            if(c_id===x['c_id']){
                count++;
                break;
            }
        }
        if(count===0){
            return(<td><button onClick={()=>{
                this.setState({id:c_id})
                        console.log('selected '+c_id+' by '+this.state.s_id);
                        const pair={c_id:c_id,s_id:this.state.s_id}
                        axios.post('http://localhost:4000/app/register_student',{pair})
                        .then(Response=>{
                            if(Response.status===200){
                                document.getElementById("alert_reg").innerHTML="Successfully registered to "+c_id;
                            }
                        })
            }}>Register</button></td>)
        }
        else{
            return(<td>Registered</td>)
        }
    }
    renderTableData(){
        console.log(this.state.courses);
        return this.state.courses.map((course,index)=>{
            const {c_id,c_name,credits}=course
            return(
                <tr id={c_id}>
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    <td>{credits}</td>
                    {/* <td><button onClick={()=>{
                        this.setState({id:c_id})
                        console.log('selected '+c_id+' by '+this.state.s_id);
                        const pair={c_id:c_id,s_id:this.state.s_id}
                        axios.post('http://localhost:4000/app/register_student',{pair})
                        .then(Response=>{
                            if(Response.status===200){
                                document.getElementById("alert_reg").innerHTML="Successfully registered to "+c_id;
                            }
                        })
                    }                 
                    }>Register</button></td> */}
                    {this.get_register(c_id)}
                    {this.get_td(c_id)}
                </tr>
            )
        })
    }
    
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
                    <div>
                        <br></br>
                        <h3>Register Into Courses</h3><br></br><br></br>
                        <div id="alert_reg"></div>
                        <table id="courses_table" className="table table-bordered table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th>Cid</th>
                                <th>Cname</th>
                                <th>Credits</th>
                                <th>Register</th>
                                <th>Unenroll</th>
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

export default courses_table;