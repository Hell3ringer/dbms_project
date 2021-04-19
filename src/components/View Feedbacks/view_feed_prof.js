import React, { Component } from 'react'
import axios from 'axios'
import TopnavProf from '../dashboard/topnav_prof'
import SidebarProf from '../dashboard/sidebar_prof'
import {Card} from 'react-bootstrap'
import {BsStarFill} from 'react-icons/bs'
import {BsStar} from 'react-icons/bs'
// import {BsArrowLeft} from 'react-icons/bs'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'
var p_id;

p_id = localStorage.getItem('loginID')

class view_feed_prof extends Component{
    constructor(props){
        super(props)
        this.state={
            
            p_id:p_id,
            feedbacks:[]
        }
    }
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <TopnavProf/>
                <SidebarProf/>
                <div className="side_main_box">
                    <h3>Feedbacks received:</h3>
                    {this.show_cards()}
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.get_feedbacks(this.state.p_id)
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
}
export default view_feed_prof;