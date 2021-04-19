import React, { Component } from 'react'
import axios from 'axios'
import Topnav from '../dashboard/topnav'
import Sidebar from '../dashboard/sidebar'
import {Card} from 'react-bootstrap'
import {BsStarFill} from 'react-icons/bs'
import {BsStar} from 'react-icons/bs'
import {BsArrowLeft} from 'react-icons/bs'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'
var s_id;

s_id = localStorage.getItem('loginID')

class show_all_prof extends Component{
    constructor(props){
        super(props)
        this.state={
            prof:[],
            id:'',
            enrolled_courses:[],
            s_id:s_id,  //HARD-CODED HERE
            seach_course:'',
            feedbacks:[],
            course_details:[]
        }
    }
    getProf(){
        axios.get('http://localhost:4000/app/prof')
        .then(res=>{
            this.setState({prof:res.data})
        })
        console.log("got courses");
    }
    get_prof_details(p_id){
        const prof={p_id:p_id}
        axios.post('http://localhost:4000/app/get_prof_details',{prof})
        .then(res=>{
            // this.setState({course_details:res.data})
            var ld=res.data;
            for(var d in ld){
                let x=ld[d];
                console.log(x['p_id']);
                console.log(x);
                document.getElementById("name").setAttribute('value',x['p_name'])
                document.getElementById("email").setAttribute('value',x['p_email'])
                document.getElementById("cno").setAttribute('value',x['p_contact_no'])
                // document.getElementById("compre").setAttribute('value',x['compre'])
            }
        })
        
    }
    componentDidMount(){
        this.getProf();
        // this.getEnrolledCourses();
        document.getElementById("half_table").setAttribute('class','display_class')
        document.getElementById("show_respective").setAttribute('class','display_class')
    }
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <Topnav/>
                <Sidebar/>
                <div className="side_main_box">
                <div id="full_side">
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
                                <th>Pid</th>
                                <th>Pname</th>
                                <th>Avg Rating(/5)</th>
                                <th>Know More</th>
                                
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
                                <th>Pid</th>
                                <th>Pname</th>
                                <th>Avg Rating(/5)</th>
                                <th>Know More</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                                
                                {/* {x=document.getElementById("search_bar").value} */}
                                {this.renderTableData2()}
                            </tbody>
                        </table>
                        </div>
                        </div>
                        <div id="show_respective">
                            {/* <a onClick={go_back()}>Back</a> */}
                            
                            <BsArrowLeft onClick={()=>{
                                document.getElementById("show_respective").setAttribute('class','display_class');
                                document.getElementById("full_side").setAttribute('class','show_display')
                            }} style={{width:"3%",height:"20%"}}>Back</BsArrowLeft><br></br><br></br>
                            <pre>Pname:       <input type="text" id="name" readOnly style={{width:"40%"}}></input></pre>
                            <pre>Email:       <input type="text" id="email" readOnly style={{width:"40%"}}></input></pre>
                            <pre>Contact Number  <input type="text" id="cno" readOnly style={{width:"40%"}}></input></pre>
                            {/* <pre>Compre date:   <input type="text" id="compre" readOnly style={{width:"40%"}}></input></pre> */}
                            <h3>Feedbacks:</h3>
                            {this.show_cards()}
                        </div>
                </div>
            </div>
        )
    }
    
    get_feedbacks(p_id){
        const prof={p_id:p_id}
        console.log("id is "+p_id);
        
        axios.post('http://localhost:4000/app/get_feedback_prof',{prof})
        .then(Response=>{
            console.log(Response);
            // j=Response.data;
            this.setState({feedbacks:Response.data})
        })
        
    }
    show_cards(){
        var j=this.state.feedbacks;
        console.log("j is "+j);
        if(j===""){
            return(<div style={{marginLeft:"40%"}}>No Feedbacks yet :(</div>)
        }
        return j.map((course_json,index)=>{
                
            let l=[]
    let x=course_json['p_rating'];
    let t=course_json['p_review'];
    console.log("p_rating is "+x+" p_review is "+t);
    // return <h3>{x}-{t}</h3>
    for(let i=0;i<x;i++){
        l.push(<BsStarFill></BsStarFill>)
    }
    for(let i=0;i<5-x;i++){
        l.push(<BsStar></BsStar>)
    }
    return(
        <Card style={{marginTop:"2%",border:"1px solid",boxShadow:"0px 14px 20px rgba(34, 35, 58, 0.2)",marginLeft:"10%",marginRight:"10%"}}>
            <Card.Body>
                <Card.Title>
                    {l}
                </Card.Title>
                <Card.Subtitle>Rating</Card.Subtitle>
                <Card.Text>
                    <br></br>{t}
                </Card.Text>
            </Card.Body>
        </Card>
    )
    })
}
    renderTableData(){
        console.log(this.state.prof);
        return this.state.prof.map((prof,index)=>{
            const {p_id,p_name,p_avg_rating}=prof
            return(
                <tr id={p_id}>
                    <td>{p_id}</td>
                    <td>{p_name}</td>
                    <td>{p_avg_rating}</td>
                    {this.know_more(p_id)}
                    {/* <td><button onClick={go_front(c_id)}>Know More</button></td> */}
                    {/* <td>{credits}</td>
                    {this.get_register(c_id)}
                    {this.get_td(c_id)} */}
                </tr>
            )
        })
    }
    renderTableData2(){
        var search=this.state.seach_course;
        console.log("search is "+search);
        return this.state.prof.map((course,index)=>{
            const {p_id,p_name,p_avg_rating}=course
            var l_id = p_id.toLowerCase()
            var l_name = p_name.toLowerCase()
            if(l_id.startsWith(search.toLowerCase())||l_name.startsWith(search.toLowerCase())){   
            return(
                <tr id={p_id}>
                    <td>{p_id}</td>
                    <td>{p_name}</td>
                    <td>{p_avg_rating}</td>
                    {this.know_more(p_id)}
                    {/* <td><button>Know More</button></td> */}
                </tr>
            )
            }
        })
    }
    know_more(p_id){
        return <td><button onClick={()=>{
            go_front()
            this.get_feedbacks(p_id)
            this.get_prof_details(p_id)
        }}>Know More</button></td>
    }
}
function go_front(){
    document.getElementById("full_side").setAttribute('class','display_class')
    document.getElementById("show_respective").setAttribute('class','show_display')
    // get_feedbacks(c_id)
}
// function go_back(){
//     document.getElementById("show_respective").setAttribute('class','display_class');
//     document.getElementById("full_side").setAttribute('class','show_display')
    
// }
export default show_all_prof;
