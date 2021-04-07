import React, { Component } from 'react'
import TopnavAdmin from '../dashboard/topnav_admin'
import SidebarAdmin from '../dashboard/sidebar_admin'
import axios from 'axios'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'



class modify_courses extends Component{
    constructor(props){
        super(props)
        this.state={
            courses:[]
        }
    }
    getCourses(){
        axios.get('http://localhost:4000/app/courses')
        .then(res=>{
            this.setState({courses:res.data})
        })
    }

    renderTableData(){
        // var ret=2;
        // axios.get('http://localhost:4000/app/courses')
        // .then(Response=>{
        //     //console.log(Response.data)
        //     ret=Response.data;
        // })
        // const lst=[];
        // const populateData=(data)=>{lst.push(data)}
        // axiosTest(populateData)
        // console.log(lst);
        
        console.log(this.state.courses);
        return this.state.courses.map((course,index)=>{
            const {c_id,c_name,handout,credits,mids,compre}=course
            return(
                <tr id={c_id}>
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    <td>{credits}</td>
                    <td><button onClick={()=>{
                        console.log(c_id);
                        document.getElementById("c_id").setAttribute("value",c_id);
                        document.getElementById("c_id").setAttribute("readonly","");
                        document.getElementById("c_name").setAttribute("value",c_name);
                        document.getElementById("hand").setAttribute("value",handout);
                        document.getElementById("cred").setAttribute("value",credits);
                        document.getElementById("mid").setAttribute("value",mids);
                        document.getElementById("compre").setAttribute("value",compre);
                    }}>Select</button></td>
                </tr>
            )
        })
    }
    componentDidMount(){
        this.getCourses();
    }
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <TopnavAdmin/>
                <SidebarAdmin/>
                <div className="side_main_box">
                    {/* <p>Modify Courses Here</p><br></br>
                    <p>Like add or delete courses and kavalante handout kuda ikkade ivvochu</p><br></br>
                    <p>window loc is {window.location.pathname}</p> */}
                    
                    <br></br><h5>For adding or deleting a course go to<a href="/add_del_course">  add/delete course</a></h5>
                    <br></br><br></br>
                    <h5>Modify course here, by selecting course and then changing in below form</h5>
                    <h3>Available Courses</h3>
                    <table id="courses_table" className="table table-bordered table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th>Cid</th>
                                <th>Cname</th>
                                <th>Credits</th>
                                <th>Select to modify</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                    </table>
                    <div id="modify_div">
                        <form>
                        <pre className="tab"><label>c_id:           <input type="text" id="c_id" placeholder="select from above"></input></label></pre>
                            <pre className="tab"><label>c_name:     <input type="text" id="c_name"></input></label></pre>
                            <pre className="tab"><label>handout:    <input type="text" id="hand"></input></label></pre>
                            <pre className="tab"><label>credits:       <input type="number" id="cred"></input></label></pre>
                            <pre className="tab"><label>mids:           <input type="date" id="mid"></input></label></pre>
                            <pre className="tab"><label>compre:      <input type="date" id="compre"></input></label></pre>
                        </form>
                        <button onClick={modify}>Modify</button>
                        <div id="after_modify"></div>
                    </div>
                </div>  
            </div>
        )
    }
    
}

function modify(){
    const course={
        c_id:document.getElementById("c_id").value,
        c_name:document.getElementById("c_name").value,
        handout:document.getElementById("hand").value,
        credits:document.getElementById("cred").value,
        mids:document.getElementById("mid").value,
        compre:document.getElementById("compre").value
    }
    console.log(course);
    axios.post('http://localhost:4000/app/update_course',{course})
    .then(Response=>{
        if(Response.status===200){
            document.getElementById("after_modify").innerHTML="Succesfully modified"
        }
    })
}

export default modify_courses