import React, { Component } from 'react'
import {FaSearch} from 'react-icons/fa'
import TopnavProf from '../dashboard/topnav_prof'
import SidebarProf from '../dashboard/sidebar_prof'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'
import axios from 'axios';
 
var id = localStorage.getItem('loginID')
class my_courses_prof extends Component{
    constructor(props){
        super(props)
        this.state={
            allotted_courses:[],
            p_id:id,
            search_course:'',
            search_student:'',
            viewStudsOf : '',
            students:[]

        }
    }
  
    getMyCourses(){
        const professor={p_id:this.state.p_id}
        console.log("this is "+ professor.p_id+ " from getMyCourses()");
        axios.post('http://localhost:4000/app/allotted_courses',{professor})
        .then(Response=>{
            this.setState({allotted_courses:Response.data});
            console.log("log data from allotted courses: "+JSON.stringify(Response.data));
        })
    }

    componentDidMount(){
        this.getMyCourses();
        document.getElementById("half_table").setAttribute('class','display_class')
        document.getElementById("studentview").setAttribute('class','display_class')
    }
    view_students(c_id){
        
        return(<td><button onClick={()=>{
            console.log(c_id+"in view_students");
        axios.post('http://localhost:4000/app/view_students',{c_id})
        .then(Response=>{
            this.setState({students:Response.data});
            console.log("students in "+{c_id} +" are " +JSON.stringify(Response.data));
        })
            this.setState({viewStudsOf:c_id})
            document.getElementById("half_table2").setAttribute('class','display_class')
            document.getElementById("nostudentview").setAttribute('class','display_class')
            document.getElementById("studentview").setAttribute('class','show_display')
        }}>View Students</button></td>)
    }

    display_students(){
        console.log("students that should be displayed "+ this.state.students);
        return this.state.students.map((student,index)=>{
            const {s_id,s_name,s_email,s_contact_no}=student
            return(
                <tr id={s_id}>
                    <td>{s_id}</td>
                    <td>{s_name}</td>
                    <td>{s_email}</td>
                    <td>{s_contact_no}</td>
                </tr>
            )
        })
    }

    display_students2(){
        var search=this.state.search_student;
        console.log("search fron st2 is "+search);
        return this.state.students.map((student,index)=>{
            const {s_id,s_name,s_email,s_contact_no}=student
            var l_id = s_id.toLowerCase()
            var l_name = s_name.toLowerCase()
            if(l_id.startsWith(search.toLowerCase())||l_name.startsWith(search.toLowerCase())){   
            return(
                <tr id={s_id}>
                    <td>{s_id}</td>
                    <td>{s_name}</td>
                    <td>{s_email}</td>
                    <td>{s_contact_no}</td>
                </tr>
            )
            }
        })
    }

    renderTableData(){
        console.log("allotted courses are "+ this.state.allotted_courses);
        return this.state.allotted_courses.map((course,index)=>{
            const {c_id,c_name,credits}=course
            return(
                <tr id={c_id}>
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    <td>{credits}</td>
                    {this.view_students(c_id)}
                </tr>
            )
        })
    }

    renderTableData2(){
        var search=this.state.search_course;
        console.log("search course is "+search);
        return this.state.allotted_courses.map((allotted_courses,index)=>{
            const {c_id,c_name,credits}=allotted_courses
            var l_id = c_id.toLowerCase()
            var l_name = c_name.toLowerCase()
            if(l_id.startsWith(search.toLowerCase())||l_name.startsWith(search.toLowerCase())){   
            return(
                <tr id={c_id}>
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    <td>{credits}</td>
                    {this.view_students(c_id)}
                </tr>
            )
            }
        })
    }
 
    render (){
        return(
            <div className="entire_div_profile">
                <TopnavProf/>
                <SidebarProf/>
            <div className="side_main_box">
                <div id="nostudentview">
                    <br></br>
                    <h3>My Courses</h3><br></br>
                   
                    <FaSearch></FaSearch><input 
                    style={{margin : 10}}
                    type="text"
                    placeholder="Type to search..."
                    id="search_bar"
                    onChange={e => {
                        this.setState({search_course:document.getElementById("search_bar").value})
                        console.log("from course search bar "+document.getElementById("search_bar").value);
                    if(document.getElementById("search_bar").value===''){
                    
                    console.log("search is empty");
                    document.getElementById("full_table").setAttribute('class','show_display')
                    document.getElementById("half_table").setAttribute('class','display_class')

                }
                else{
                    document.getElementById("full_table").setAttribute('class','display_class')
                    document.getElementById("half_table").setAttribute('class','show_display')
                }
          }}

        ></input> <br></br><br></br>
                    <div id="full_table">
                    <table id="courses_table" className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th>Cid</th>
                            <th>Cname</th>
                            <th>Credits</th>
                            <th>View Students</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            
                            {this.renderTableData()}
                        </tbody>
                    </table>
                    </div>
                    <div id="test"> </div>
                    <div id="half_table">
                    <table id="courses_table_2" className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th>Cid</th>
                            <th>Cname</th>
                            <th>Credits</th>
                            <th>View Students</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            {this.renderTableData2()}
                        </tbody>
                    </table>
                    </div>
                </div>
                <div id="studentview">
                <h3>Students in {this.state.viewStudsOf}</h3><br></br><br></br>
                   
                   <FaSearch></FaSearch><input 
                   style={{margin : 10}}
                   type="text"
                   placeholder="Type to search..."
                   id="search_bar2"
                   onChange={e => {
                       this.setState({search_student:document.getElementById("search_bar2").value})
                       console.log(document.getElementById("search_bar2").value);
                   if(document.getElementById("search_bar2").value===''){
                   
                   console.log("st search is empty");
                   document.getElementById("full_table2").setAttribute('class','show_display')
                   document.getElementById("half_table2").setAttribute('class','display_class')

               }
               else{
                   document.getElementById("full_table2").setAttribute('class','display_class')
                   document.getElementById("half_table2").setAttribute('class','show_display')
               }
                    }}

                    ></input>
                   <div id="full_table2">
                    <table id="students" className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th>Sid</th>
                            <th>Sname</th>
                            <th>Semail</th>
                            <th>SContactNo</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.display_students()}
                        </tbody>
                    </table>
                   </div>
                   <div id="half_table2">
                    <table id="students2" className="table table-bordered table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th>Sid</th>
                                <th>Sname</th>
                                <th>Semail</th>
                                <th>SContactNo</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.display_students2()}
                            </tbody>
                        </table>
                   </div>
                </div>
            </div>  

        </div>
        )
    }
}

export default my_courses_prof;