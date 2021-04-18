import React, { Component } from 'react'
import TopnavAdmin from '../dashboard/topnav_admin'
import SidebarAdmin from '../dashboard/sidebar_admin'
import axios from 'axios'
import Select from 'react-select'
import Swal from 'sweetalert2'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/profile.css'

class addOrDeleteCourse extends Component{
    constructor(props){
        super(props)
        this.state = {
          selectOptions : [],
          id: "",
          name: ''
        }
      }
    async getOptions(){
        const res = await axios.get('http://localhost:4000/app/courses')
        const data = res.data
    
        const options = data.map(d => ({
          "value" : d.c_id,
          "label" : d.c_name
        }))
        this.setState({selectOptions: options})
    }
    componentDidMount(){
        this.getOptions()
    }
    handleChange(e){
        this.setState({id:e.value, name:e.label})
        console.log('selected '+e.value+' name is '+e.label);
        document.getElementById("alert").innerHTML="Selected "+e.value+" - "+e.label+" and on pressing delete, will be deleted!"
    }

    // const { value: file } = await Swal.fire({
    //     title: 'Select image',
    //     input: 'file',
    //     inputAttributes: {
    //       'accept': 'image/*',
    //       'aria-label': 'Upload your profile picture'
    //     }
    //   })
      
    //   if (file) {
    //     const reader = new FileReader()
    //     reader.onload = (e) => {
    //       Swal.fire({
    //         title: 'Your uploaded picture',
    //         imageUrl: e.target.result,
    //         imageAlt: 'The uploaded picture'
    //       })
    //     }
    //     reader.readAsDataURL(file)
    //   }
   
    render(){
        console.log(this.state.selectOptions);
        return(
            
            <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <TopnavAdmin/>
                <SidebarAdmin/>
                <div className="side_main_box" style={{display:"flex"}}>
                    <div id="adding_course">
                        <h3>Add a course</h3><br></br>         
                        <form>
                            <pre className="tab"><label>c_id:           <input type="text" id="c_id"></input></label></pre>
                            <pre className="tab"><label>c_name:     <input type="text" id="c_name"></input></label></pre>
                            <pre className="tab"><label>handout:    <input type="file" id="hand"></input></label></pre>
                            <pre className="tab"><label>credits:       <input type="number" id="cred"></input></label></pre>
                            <pre className="tab"><label>mids:           <input type="date" id="mid"></input></label></pre>
                            <pre className="tab"><label>compre:      <input type="date" id="compre"></input></label></pre>
                        </form>
                        <button onClick={addCourse}>Add</button>
                        <div id="out"></div>
                    </div>
                    <div className="col-sm-2"></div>
                    <div id="deleting_course" className="col-sm-5">
                        <h3> Delete A Course</h3><br></br>
                        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)}>Select from already existing course</Select><br></br>
                        <button onClick={()=>{
                            const c_id=this.state.id;
                            if(c_id===''){
                                document.getElementById("del").innerHTML='Did not select'
                            }
                            else{
                                Swal.fire({
                                    title:'Alert',
                                    text:'Are you sure, you want to Delete course '+c_id,
                                    confirmButtonText:'Yes, Delete',
                                    showCancelButton:true,
                                    cancelButtonText:'No, dont'
                                }).then((result)=>{
                                    if(result.value){
                                        axios.post('http://localhost:4000/app/delete_course',{c_id})
                                        .then(Response=>{
                                        if(Response.status===200){
                                            document.getElementById("alert").innerHTML='';
                                            document.getElementById("del").innerHTML='Deleted '+this.state.id+' Successfully!'
                                        }
                                        })
                                        Swal.fire({
                                            title:'Deletion of course',
                                            text:'Successfully Deleted course '+c_id,
                                            confirmButtonText:'Ok'
                                        }).then((res)=>{
                                            if(res.value){
                                                window.location.reload();
                                            }
                                        })
                                    }
                                    
                                });
                            
                            }
                        }}>Delete</button>
                        <div id="alert"></div>
                        <div id="del"></div>
                    </div>
                </div>
            </div>
        )
    }    

}
function addCourse(){
    const course={
        c_id:document.getElementById("c_id").value,
        c_name:document.getElementById("c_name").value,
        handout:document.getElementById("hand").value,
        credits:document.getElementById("cred").value,
        mids:document.getElementById("mid").value,
        compre:document.getElementById("compre").value
    }
    console.log(course.c_id+" "+course.c_name+" "+course.handout+" "+course.credits+" "+course.mids+" "+course.compre);
    if(course.c_id===''||course.c_name===''){
        document.getElementById("out").innerHTML='c_id and c_name cannot be empty'
    }
    else{
        Swal.fire({
            text:'Are you sure, you want to Add course '+course.c_id,
            confirmButtonText:'Yes, Add',
            showCancelButton:true,
            cancelButtonText:'No, dont'
        }).then((result)=>{
            if(result.value){
                axios.post('http://localhost:4000/app/add_course',{course})
                .then(Response=>{
                if(Response.status===200){
                    document.getElementById("out").innerHTML='Added Successfully!'
                }
                })
                Swal.fire({
                    title:'Addition of course',
                    text:'Successfully Added course '+course.c_id,
                    confirmButtonText:'Ok'
                }).then((res)=>{
                    if(res.value){
                        window.location.reload();
                    }
                })
            }
            
        });
        
    }
    
}

export default addOrDeleteCourse