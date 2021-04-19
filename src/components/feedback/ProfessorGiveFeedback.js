import React, { Component } from 'react'
import axios from 'axios'
import Topnav from '../dashboard/topnav';
import Sidebar from '../dashboard/sidebar';

export class CourseGiveFeedback extends Component {
    constructor(props){
        super(props);
        this.state={
            professors:[],
            s_id:localStorage.getItem('loginID')
        }
    }
    getProfessors(){
        const student={s_id:this.state.s_id};
        axios.post('http://localhost:4000/app/registered_professor',{student})
        .then(res=>{
            this.setState({professors:res.data})
        })
    }
    componentDidMount(){
       // document.getElementById("hello_sid").innerHTML='Hello '+this.state.s_id;
        this.getProfessors();
    }
    redirectToFeedback(p_id){
        sessionStorage.setItem('pID',p_id);
        console.log("pid id " + p_id);
        window.location.replace('/feedback');

    }
    renderTableData(){

        console.log(this.state.professors);
        return this.state.professors.map((professor,index)=>{
            const {p_id,p_name}=professor
            
            return(
                
                <tr id={p_id}  >
                    <td>{p_id}</td>
                    <td>{p_name}</td>
                    <td><button onClick={() => this.redirectToFeedback(professor.p_id)} >feedback</button></td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="entire_div_profile">
                <Topnav />
                <Sidebar />
                <div id="side_main_box"> 
                <div> 
                    <h5>Professors:</h5>
                    <table id="courses_table" className="table table-bordered table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th>Professor ID</th>
                                <th>Professor name</th>
                                <th>Feedback</th>
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

export default CourseGiveFeedback
