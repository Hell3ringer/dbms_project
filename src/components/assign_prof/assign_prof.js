import React, { Component } from 'react'
import Swal from 'sweetalert2'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'
import axios from 'axios';
// import { traverseTwoPhase } from 'react-dom/test-utils'
import {Card, Button, Modal, ModalBody, ModalFooter} from 'react-bootstrap'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { FormGroup, FormLabel } from 'react-bootstrap'
import TopnavAdmin from '../dashboard/topnav_admin'
import SidebarAdmin from '../dashboard/sidebar_admin';
 
 
class assign_prof extends Component{
 
    constructor(props){
        super(props)
        this.state={
            courseprof:[],
            search_course:'',
            courses:[],
            all_course_prof:[],
            all:[],
            html_rows:[],
            showAddProfs:{}
        }
    }
 
    componentDidMount(){
        this.getCourses();
    }
 
    AddProf(pid,cid){
        console.log("in addProf "+pid+" "+cid);
        axios.post('http://localhost:4000/app/add_prof',{pid,cid})
                .then(Response=>{
                    if(Response.data===-1){
                        console.log("error inserting");
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Recheck the number'
                          })
                    }
                    else{
                        Swal.fire({
                            title:'Registration',
                            text:'Professor added to '+cid,
                            confirmButtonText:'Ok',
                            icon:'success'
                        }).then((res)=>{
                            if(res.value){
                                window.location.reload();
                            }
                        })
                        console.log("professor added");
                    }
                })
    }
 
    getCourses(){
        axios.get('http://localhost:4000/app/courses')
        .then(res=>{
            this.setState({courses:res.data})
            var l=[]
            var z=res.data
            console.log(z);
            for(let x in z){
                let sap=this.state.showAddProfs;
                sap[z[x]['c_id']]=false;
                this.setState({showAddProfs:sap})
                console.log(z[x]+" "+z[x]['c_id']);
                var c_id=z[x]['c_id']
                axios.post('http://localhost:4000/app/courseprof',{c_id})
                .then(Response=>{
                    console.log(Response.data);
                    // var r=[];
                    // r=Response.data;
                    // var emp=[];
                    console.log("Rwsponse is "+JSON.stringify(Response.data)+"for cid "+z[x]['c_id']);
                    
                        let y=Response.data
                        let test=-1;
                        for(test in y){
                            l.push({"c_id":z[x]['c_id'],"c_name":z[x]['c_name'],"prof":y[test]['p_name']})
                            console.log("l is "+l);
                            this.setState({all:l})
                            var all=this.state.all;
                            console.log("all is "+all);
                        }
                        console.log("test is "+test+" for cid "+z[x]['c_id']);
                    if(test===-1){
                        l.push({"c_id":z[x]['c_id'],"c_name":z[x]['c_name'],"prof":"-"})
                        console.log("l is "+l);
                            this.setState({all:l})
                            all=this.state.all;
                    }
                })
                console.log("l is "+l);
            }
        }) 
 
    }
  
    update_prof(c_id){
        return(<td><button onClick={()=>{
                      
        }}>Update</button></td>)
      
    }
    
    createCards(){
        console.log("all at cards is "+JSON.stringify(this.state.all));
        var all=this.state.all;
        var done={};
        for(let a in all){
            
            done[all[a]['c_id']]=0;
        }
        return all.map((row,index)=>{
            const {c_id,c_name}=row;
            if(done[c_id]===0){
            var l=[];
            for(let t in all){
                if(all[t]['c_id']===c_id){
                    console.log("prof for cid "+c_id+" is "+all[t]['prof']);
                    if(all[t]['prof']==="-"){
                        // l.push(<ListGroupItem>No professors alloted<button style={{float:"right"}}>Add</button></ListGroupItem>)
                    }
                    else{
                        l.push(<ListGroupItem>{all[t]['prof']}<button style={{float:"right"}} onClick={()=>{
                            console.log("prof is "+all[t]["prof"]+ " and course is "+c_id);
                            
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "you want to remove "+all[t]["prof"]+"?",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Yes, proceed'
                              }).then((result) =>{
                                  if (result.isConfirmed) {
                                    var pname= all[t]["prof"]
                                    axios.post('http://localhost:4000/app/remove_prof',{pname,c_id})
                                    .then(Response=>{
                                        Swal.fire(
                                            'Removed!',
                                            'Professor has been removed',
                                            'success'
                                          )
                                          Swal.fire({
                                            title:'Removed',
                                            text:'Professor successfully removed from '+c_id,
                                            confirmButtonText:'Ok',
                                            icon:'success'
                                        }).then((res)=>{
                                            if(res.value){
                                                window.location.reload();
                                            }
                                        })
                                        console.log(Response.data);
                                    })  
                                        
                                  }
                              }
                              )
                            
                        }}>Remove</button></ListGroupItem>)
                        }
                    done[c_id]=1;
                }
            }
            return(
                <Card style={{marginTop:"2%",border:"1px solid",boxShadow:"0px 14px 20px rgba(34, 35, 58, 0.2)",marginLeft:"10%",marginRight:"10%"}}>
                    <Card.Body>
                        <Card.Title>
                            {c_name}-{c_id}
                        </Card.Title>
                        {/* <Card.Subtitle>Course Name - c_id</Card.Subtitle> */}
                        <br></br>
                        <ListGroup style={{width:"60%",marginLeft:"20%"}}>
                            <ListGroupItem active>Professors:</ListGroupItem>
                            {l}
                        </ListGroup>
                        <Card.Text style={{marginLeft:"80%"}}>Alloted:{l.length} Remaining:{3-l.length}</Card.Text>
                        {this.cardButton(l,c_id)}
                    </Card.Body>
                </Card>
            )
            }
            else{
 
            }
        })
    }
    
    cardButton(l,c_id){
        if(l.length<3){
            console.log("cid from cardbutton"+c_id);
            var current_state=this.state.showAddProfs;
            return(
            <div>
            <button style={{float:"right"}} onClick={()=>{
                current_state[c_id]=true;
                this.setState({showAddProfs:current_state})
                }}>Add</button>
            <Modal show={this.state.showAddProfs[c_id]} onHide={()=>{this.setState({showAddProfs:{c_id:false}})}}>
                <ModalHeader closeButton>Add Professor</ModalHeader>
                <ModalBody>
                    <FormGroup >
                        <div className="text-center">
                        <FormLabel>Professor ID</FormLabel>
                        <input type="text" placeholder="20xxPxxxxH..." id={c_id}></input>
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>{
                        console.log("input is "+document.getElementById(c_id).value);
                        this.AddProf(document.getElementById(c_id).value,c_id)
                        console.log(c_id+" is the cid after click");
                        }}>Add</Button>
                    <Button onClick={()=>{this.setState({showAddProfs:{c_id:false}})}}>Close</Button>
                </ModalFooter>
            </Modal>
            </div>
            )
        }
        if(l.length===3){
            return(<h5 style={{float:"right"}}>Remove existing professors to add new</h5>)
        }
    }
    
    render(){
        return(
            <div className="entire_div_profile">
                <TopnavAdmin/>
                <SidebarAdmin/>
                <div className="side_main_box">
                    <div>
                        <br></br>
                        <h3>Assign Professors to Courses</h3><br></br><br></br>
                    </div>
                    {this.createCards()}
                </div>  
 
            </div>
        )
    }
}
 
export default assign_prof;