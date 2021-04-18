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

class show_all_courses extends Component{
    constructor(props){
        super(props)
        this.state={
            courses:[],
            id:'',
            enrolled_courses:[],
            s_id:'2019A7PS0155H',  //HARD-CODED HERE
            seach_course:'',
            feedbacks:[],
            course_details:[]
        }
    }
    getCourses(){
        axios.get('http://localhost:4000/app/courses')
        .then(res=>{
            this.setState({courses:res.data})
        })
        console.log("got courses");
    }
    get_course_details(c_id){
        const course={c_id:c_id}
        axios.post('http://localhost:4000/app/get_course_details',{course})
        .then(res=>{
            // this.setState({course_details:res.data})
            var ld=res.data;
            for(var d in ld){
                let x=ld[d];
                console.log(x['c_id']);
                console.log(x);
                document.getElementById("credits").setAttribute('value',x['credits'])
                document.getElementById("handout").setAttribute('value',x['handout'])
                document.getElementById("mids").setAttribute('value',x['mids'])
                document.getElementById("compre").setAttribute('value',x['compre'])
            }
        })
        
    }
    componentDidMount(){
        this.getCourses();
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
                                <th>Cid</th>
                                <th>Cname</th>
                                <th>Avg Rating</th>
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
                                <th>Cid</th>
                                <th>Cname</th>
                                <th>Avg Rating</th>
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
                            <pre>Credits:       <input type="text" id="credits" readOnly style={{width:"40%"}}></input></pre>
                            <pre>Handout:       <input type="text" id="handout" readOnly style={{width:"40%"}}></input></pre>
                            <pre>Mid-Sem date:  <input type="text" id="mids" readOnly style={{width:"40%"}}></input></pre>
                            <pre>Compre date:   <input type="text" id="compre" readOnly style={{width:"40%"}}></input></pre>
                            <h3>Feedbacks:</h3>
                            {this.show_cards()}
                        </div>
                </div>
            </div>
        )
    }
    
    get_feedbacks(c_id){
        const course={c_id:c_id}
        console.log("id is "+c_id);
        
        axios.post('http://localhost:4000/app/get_feedback_course',{course})
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
    let x=course_json['c_rating'];
    let t=course_json['c_review'];
    console.log("c_rating is "+x+" c_review is "+t);
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
        console.log(this.state.courses);
        return this.state.courses.map((course,index)=>{
            const {c_id,c_name}=course
            return(
                <tr id={c_id}>
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    <td>4</td>
                    {this.know_more(c_id)}
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
        return this.state.courses.map((course,index)=>{
            const {c_id,c_name}=course
            var l_id = c_id.toLowerCase()
            var l_name = c_name.toLowerCase()
            if(l_id.startsWith(search.toLowerCase())||l_name.startsWith(search.toLowerCase())){   
            return(
                <tr id={c_id}>
                    <td>{c_id}</td>
                    <td>{c_name}</td>
                    <td>4</td>
                    {this.know_more(c_id)}
                    {/* <td><button>Know More</button></td> */}
                </tr>
            )
            }
        })
    }
    know_more(c_id){
        return <td><button onClick={()=>{
            go_front(c_id)
            this.get_feedbacks(c_id)
            this.get_course_details(c_id)
        }}>Know More</button></td>
    }
}
function go_front(c_id){
    document.getElementById("full_side").setAttribute('class','display_class')
    document.getElementById("show_respective").setAttribute('class','show_display')
    // get_feedbacks(c_id)
}
// function go_back(){
//     document.getElementById("show_respective").setAttribute('class','display_class');
//     document.getElementById("full_side").setAttribute('class','show_display')
    
// }
export default show_all_courses;
