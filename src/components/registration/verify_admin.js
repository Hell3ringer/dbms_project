import React, { Component } from 'react'
import TopnavAdmin from '../dashboard/topnav_admin'
import SidebarAdmin from '../dashboard/sidebar_admin'
import axios from 'axios'
import Swal from 'sweetalert2'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'

class verify_admin extends Component{
    constructor(props){
        super(props)
        this.state={
            verify:[]
        }
    }
    getDetails(){
        axios.get('http://localhost:4000/app/get_verify_admin')
        .then(res=>{
            this.setState({verify:res.data})
            
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
        
        console.log(this.state.verify);
        return this.state.verify.map((admin,index)=>{
            const {id}=admin
            return(
                <tr id={id}>
                    <td>{id}</td>
                    
                    <td><button onClick={()=>{
                        Swal.fire({
                            title:'Verification',
                            text:'Are you sure, you want to Aprove admin '+id,
                            confirmButtonText:'Yes, Approve',
                            showCancelButton:true,
                            cancelButtonText:'No, dont'
                        }).then((result)=>{
                            if(result.value){
                                axios.post('http://localhost:4000/app/verify_admin',{id})
                        .then(Response=>{
                            if(Response.status===200){
                                document.getElementById("after_modify").innerHTML="Approved "+id;
                                
                                window.location.replace('/verify_admin')
                            }
                        })
                            }

                        })
                        
                    }}>Verify</button></td>
                </tr>
            )
        })
    }
    componentDidMount(){
        this.getDetails();
    }
    // modify(s_id){
    //     axios.post('http://localhost:4000/app/verify_student',{s_id})
    //     .then(Response=>{
    //         if(Response.status===200){
    //             document.getElementById("after_modify").innerHTML="Approved ";
    //             window.location.replace('/verify')
    //         }
    //     })
        
    // }
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <TopnavAdmin/>
                <SidebarAdmin/>
                <div className="side_main_box">
                    <h3>Admin Accounts verification</h3>
                    <div id="after_modify"></div>
                    <table id="details_table" className="table table-bordered table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                
                                <th>Verify</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                    </table>
                </div>  
            </div>
        )
    }
    
}

// function modify(s_id){
//     axios.post('http://localhost:4000/app/verify_student',{s_id})
//     .then(Response=>{
//         if(Response.status===200){
//             // document.getElementById("after_modify").innerHTML="Succesfully modified";
//             window.location.replace('/verify')
//         }
//     })
    
// }

export default verify_admin