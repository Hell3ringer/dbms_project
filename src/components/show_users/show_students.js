import React, { Component } from 'react'
import SidebarAdmin from '../dashboard/sidebar_admin';
import TopnavAdmin from '../dashboard/topnav_admin';
import {FaSearch} from 'react-icons/fa' 
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'
import axios from 'axios';

class ShowStudents extends Component {
    constructor(props){
        super(props)
        this.state={
            students:[],
            search_stud:''
        }
    }

    getStudents(){
        axios.get('http://localhost:4000/app/students')
        .then(Response=>{
            this.setState({students:Response.data});
        })
    }

    componentDidMount(){
        this.getStudents();
        document.getElementById("half_table").setAttribute('class','display_class')
    }

    renderTableData(){
        return this.state.students.map((studs,index)=>{
            const {s_id,s_name,s_email,s_contact_no}=studs
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

    renderTableData2(){
        var search=this.state.search_stud;
        return this.state.students.map((studs,index)=>{
            const {s_id,s_name,s_email,s_contact_no}=studs
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

    render(){
        return(
            <div className="entire_div_profile">
            <TopnavAdmin/>
            <SidebarAdmin/>
            <div className="side_main_box">
                <div id="nostudentview">
                    <br></br>
                    <h3>Students</h3><br></br>
                    <FaSearch></FaSearch><input 
                    style={{margin : 10}}
                    type="text"
                    placeholder="Type to search..."
                    id="search_bar"
                    onChange={e => {
                        this.setState({search_stud:document.getElementById("search_bar").value})
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

        ></input><br></br><br></br>
                    <div id="full_table">
                    <table id="courses_table" className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th>Sid</th>
                            <th>name</th>
                            <th>email</th>
                            <th>contact no</th>
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
                            <th>Sid</th>
                            <th>name</th>
                            <th>email</th>
                            <th>contact no</th>
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

export default ShowStudents