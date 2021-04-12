import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Topnav_prof from '../dashboard/topnav_prof'
import Sidebar_prof from '../dashboard/sidebar_prof'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'
var id = localStorage.getItem("loginID")
class show_profile_prof extends Component{
    constructor(props){
        super(props)
        this.state={
            details:[1],
            id : id
        }
    }
    get_details(){
        const prof={p_id:this.state.id}
        axios.post('http://localhost:4000/app/get_prof_details',{prof})
        .then(res=>{
            this.setState({details:res.data})
            console.log(res.data);
            var ld=res.data;
            for(var d in ld){
                let x=ld[d];
                console.log(x['p_id']);
                document.getElementById("show_pid").setAttribute('value',x['p_id'])
                document.getElementById("show_pname").setAttribute('value',x['p_name'])
                document.getElementById("show_pemail").setAttribute('value',x['p_email'])
                document.getElementById("show_pcontact_no").setAttribute('value',x['p_contact_no'])
            }
        })
        // console.log(this.state.details);
    }
    
    
    componentDidMount(){
        this.get_details();
        //this.show();
    }
    render(){
        return(
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <Topnav_prof/>
                <Sidebar_prof/>
                <div className="side_main_box" style={{marginLeft:"20%",border:"1px solid",width:"45%",height:"50%",borderRadius:"10px"}}>
                <img src="http://www.caiml.co.uk/wp-content/uploads/2016/03/270x270-male-avatar.png" style={{width:"35%",height:"20%",marginLeft:"33%"}} ></img><br></br><br></br>
                    <pre >ID:            <input type="text" id="show_pid" readOnly></input></pre>
                    <pre >NAME:          <input type="text" id="show_pname" readOnly></input></pre>
                    <pre >EMAIL:         <input type="text" id="show_pemail" readOnly></input></pre>
                    <pre >CONTACT NO:    <input type="text" id="show_pcontact_no" readOnly></input></pre>
                    <p style={{marginLeft:"90%"}}><Link to={'/profile_prof_edit'}>Edit</Link></p>
                </div>
                
            </div>
        )
    }
    show(){
        // let x=this.state.details[0];
        // document.getElementById("show_sid").innerHTML=x.get('s_id');
        for(var d in this.state.details){
            let x=this.state.details[d];
            console.log(x['p_id']);
            document.getElementById("show_pid").innerHTML=x['p_id']
        }
    }
    
}
export default show_profile_prof;