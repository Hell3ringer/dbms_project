import React, { Component } from 'react'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'
import Swal from 'sweetalert2'
import {FaSearch} from 'react-icons/fa'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'
import axios from 'axios';

class assign_prof extends Component{

    constructor(props){
        super(props)
        this.state={
            courseprof:[],
            search_course:'',
            courses:[]
        }
    }

    componentDidMount(){
        this.getCourses();
        // this.getAllProfs() 
        document.getElementById("half_table").setAttribute('class','display_class')
    }

    getCourses(){
        axios.get('http://localhost:4000/app/courses')
        .then(res=>{
            this.setState({courses:res.data})
        })
        console.log("got courses");
    }

    getCourseProf(c_id){
            axios.post('http://localhost:4000/app/courseprof',{c_id})
            .then(res=>{
                let x=res.data;
                var para=document.createElement("td")
                let id=c_id+"_td"
                console.log("initially para is "+JSON.stringify(para));
                console.log("x is "+x);
                for(let y in x){
                    var p=document.createElement("p");
                    var text=document.createTextNode((x[y])['p_name']);
                    console.log("p_name is "+(x[y])['p_name']);
                    p.appendChild(text)
                    console.log("p is "+JSON.stringify(p));
                    para.appendChild(p)
                }
                console.log("finally para is "+JSON.stringify(para)+" c_id is "+ c_id);

                var td=document.getElementById(c_id);
                console.log("td is "+ td);
                td.appendChild(para)
        })
    
    }

    
    update_prof(c_id){
        return(<td><button onClick={()=>{
                      
        }}>Update</button></td>)
      
    }

    renderTableData(){
        console.log(this.state.courseprof);
        return this.state.courses.map((data,index)=>{
            const {c_id,c_name}=data
            return(
                <tr id={c_id}>
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    {/* <td>{professors}</td> */}
                    {this.getCourseProf(c_id)}
                    {this.update_prof(c_id)}
                </tr>
            )
        })
    }

    renderTableData2(){
        // var search=this.state.seach_course;
        // console.log("search is "+search);
        // return this.state.courses.map((data,index)=>{
        //     const {c_id,c_name}=data
        //     var l_id = c_id.toLowerCase()
        //     var l_name = c_name.toLowerCase()
        //     if(l_id.startsWith(search.toLowerCase())||l_name.startsWith(search.toLowerCase())){   
        //     return(
        //         <tr id="id2">
        //             <td>{c_id}</td>
        //             <td>{c_name}</td>
        //             {this.getCourseProf(c_id)}
        //             {this.update_prof(c_id)}
        //         </tr>
        //     )
        //     }
        // })
    }

    render(){
        return(
            <div className="entire_div_profile">
                <Topnav/>
                <Sidebar/>
                <div className="side_main_box">
                    <div>
                        <br></br>
                        <h3>Assign Professors to Courses</h3><br></br><br></br>
                       
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
                                <th>Professor(s)</th>
                                <th>Update</th>
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
                                 <th>Professor(s)</th>
                                <th>Update</th>
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
export default assign_prof;
