import React, { Component } from 'react'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'
import Swal from 'sweetalert2'
import {FaSearch} from 'react-icons/fa'
 
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
            seach_course:''
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
        // this.getSearchedCourses();
        document.getElementById("half_table").setAttribute('class','display_class')
    }

    view_students(c_id){
        return(<td><button onClick={()=>{
            window.location.replace("/view_students")     
        }}>View Students</button></td>)
    }

    renderTableData(){
        console.log(this.state.allotted_courses);
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
        var search=this.state.seach_course;
        console.log("search is "+search);
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
            <Topnav/>
            <Sidebar/>
            <div className="side_main_box">
                <div>
                    <h3>My Courses</h3><br></br><br></br>
                    {/* <div id="alert_reg"></div> */}
                   
                    <FaSearch></FaSearch><input 
                    style={{margin : 10}}
                    type="text"
                    placeholder="Type to search..."
                    id="search_bar"
                    onChange={e => {
                        this.setState({seach_course:document.getElementById("search_bar").value})
                        console.log(document.getElementById("search_bar").value);
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

        ></input>
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
            </div>  

        </div>
        )
    }
}

export default my_courses_prof;