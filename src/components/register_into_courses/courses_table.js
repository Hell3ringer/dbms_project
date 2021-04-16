import React, { Component } from 'react'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'
import Swal from 'sweetalert2'
import {FaSearch} from 'react-icons/fa'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'
import axios from 'axios';
 
var id = localStorage.getItem('loginID')
  
class courses_table extends Component{
    constructor(props){
        super(props)
        this.state={
            courses:[],
            enrolled_courses:[],
            s_id: id,
            seach_course:''
        }
    }
    getCourses(){
        axios.get('http://localhost:4000/app/courses')
        .then(res=>{
            this.setState({courses:res.data})
        })
        console.log("got courses");
    }
    getEnrolledCourses(){
        const student={s_id:this.state.s_id}
        //console.log(student.s_id);
        axios.post('http://localhost:4000/app/registered_courses',{student})
        .then(Response=>{
            this.setState({enrolled_courses:Response.data});
            console.log("log data"+JSON.stringify(Response.data));
        })
    }
    componentDidMount(){
        this.getCourses();
        this.getEnrolledCourses();
        document.getElementById("half_table").setAttribute('class','display_class')
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
                    const pair={c_id:c_id,s_id:this.state.s_id};
                    Swal.fire({
                        title:'Alert',
                        text:'Are you sure, you want to Unenroll from '+c_id+'?',
                        confirmButtonText:'Yes, Unenroll',
                        showCancelButton:true,
                        cancelButtonText:'No, dont'
                    }).then((result)=>{
                        if(result.value){
                            axios.post('http://localhost:4000/app/delete_registered_course',{pair})
                            .then(Response=>{
                            if(Response.status===200){
                                document.getElementById("alert_reg").innerHTML="Unenrolled from "+c_id;
                            }
                            })
                            Swal.fire({
                                title:'Unenrollment',
                                text:'Successfully Unenrolled from '+c_id,
                                confirmButtonText:'Ok'
                            }).then((res)=>{
                                if(res.value){
                                    window.location.reload();
                                }
                            })
                        }
                        
                    });
                    
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
                        const course={c_id:c_id}
                        
                        if(this.state.enrolled_courses.length>=9){
                            Swal.fire({
                                title:'Alert!!!',
                                text:'You have already enrolled into 9 courses which is maximum limit and you cannot enroll more!',
                                confirmButtonText:'Ok, got it',
                                icon:'error'
                            })
                        }
                        else{
                            axios.post('http://localhost:4000/app/get_enrolled_students',{course})
                            .then(Response=>{
                                this.setState({n:Response.data.length})
                                console.log("length is"+Response.data.length);
                                console.log("n is"+this.state.n);
                                
                                    let n=this.state.n;
                                    // axios.post('http://localhost:4000/app/get_enrolled_students',{course})
                                    // .then(Response=>{
                                    //     this.setState({n:Response.data.length})
                                    //     // console.log("length is"+Response.data.length);
                                    //     // console.log("n is"+this.state.n);
                                    //     n=Response.data.length;
                                    // })
                                    console.log("n is"+n);
                                if(n<300){
                                let avail=300-n;
                                console.log("avail is "+avail);
                                console.log("n is "+n);
                                Swal.fire({
                                    html:'<div>Available seats: '+avail+' Maximum limit:300.<br>'+'Are you sure, you want to register to '+c_id+'?</div>',
                                    confirmButtonText:'Yes, Register',
                                    showCancelButton:true,
                                    cancelButtonText:'No, dont'
                                }).then((result)=>{
                                    if(result.value){
                                        axios.post('http://localhost:4000/app/register_student',{pair})
                                        .then(Response=>{
                                        if(Response.status===200){
                                            document.getElementById("alert_reg").innerHTML="Successfully registered to "+c_id;                               
                                        }
                                        })
                                        Swal.fire({
                                            title:'Registration',
                                            text:'Successfully registered to '+c_id,
                                            confirmButtonText:'Ok',
                                            icon:'success'
                                        }).then((res)=>{
                                            if(res.value){
                                                window.location.reload();
                                            }
                                        })
                                    }
                                    
                                });
                                }
                                else{
                                    Swal.fire({
                                        title:"Alert!",
                                        text:"Maximum limit reached!, you cannot enroll into this course",
                                        confirmButtonText:"Ok, got it"
                                    })
                                }
                            })
                        }    
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
                    {this.get_register(c_id)}
                    {this.get_td(c_id)}
                </tr>
            )
        })
    }
    renderTableData2(){
        var search=this.state.seach_course;
        console.log("search is "+search);
        return this.state.courses.map((course,index)=>{
            const {c_id,c_name,credits}=course
            var l_id = c_id.toLowerCase()
            var l_name = c_name.toLowerCase()
            if(l_id.startsWith(search.toLowerCase())||l_name.startsWith(search.toLowerCase())){   
            return(
                <tr id={c_id}>
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    <td>{credits}</td>
                    {this.get_register(c_id)}
                    {this.get_td(c_id)}
                </tr>
            )
            }
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
                        <FaSearch></FaSearch>
                        <input 
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
                                <th>Register</th>
                                <th>Unenroll</th>
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
                                <th>Register</th>
                                <th>Unenroll</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                                
                                {/* {x=document.getElementById("search_bar").value} */}
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
 
export default courses_table;