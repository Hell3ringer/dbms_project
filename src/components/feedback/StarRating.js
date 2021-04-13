import axios from 'axios';
import React ,{Component} from 'react'
import { FaStar } from 'react-icons/fa'
import Swal from 'sweetalert2';
import './StarRating.css'
var rName,sID,cID,pID;
var rColour;
var styling = {
    color:rColour
}

function getID(){
    sID = localStorage.getItem('loginID');  
    cID = sessionStorage.getItem('cID');  
    pID = sessionStorage.getItem('pID');
}


class  StarRating extends Component {
    constructor(props) {
        super(props)    
        this.state = {
             rating : null,
             hover : null,
             review:''
        }
        this.submit = this.submit.bind(this)
    }

    rating_name(rating){    
        switch (rating) {
            case 1:
                rName = 'worst'
                rColour = '#FF0000'
                break;           
            case 2:
                rName = 'bad'
                rColour = '#A52A2A'
                break;
            case 3:
                rName = 'average'
                rColour = '#FFFF00'
                break;
            case 4:
                rName = 'good'
                rColour = '#ADFF2F'
                break;
            case 5:
                rName = 'best'
                rColour = '#00FF00'
                break;            
            default:
                rName = 'none'
                rColour = '#e4e8e9'
                break;
               
        } 
        ;
        styling = {
            color:rColour
        }
        
        
    }
    
    submit(Event){
        Event.preventDefault();
        
        if (cID === null) {
            const feedback = {
                rating : this.state.rating,
                review : document.getElementById("review").value,
                s_id:sID,
                p_id:pID
            }
            console.log(JSON.stringify(feedback,null,2));
        axios.post("http://localhost:4000/app/feedback_professor",feedback)
        .then(Response => {
            if (Response.status === 200) {
                Swal.fire({
                    title: 'success',
                    text: "prof feedback registered!",
                    icon: 'success',
                    confirmButtonText: 'ok'
                  }).then((result) =>{
                      if (result.isConfirmed) { 
                        sessionStorage.removeItem('pID')   

                        window.location.replace("/dashboard")                        
                          
                      }
                  }
                  )
            }
        })
        } else {
            const feedback = {
                rating : this.state.rating,
                review : document.getElementById("review").value,
                s_id:sID,
                c_id:cID
            }
            console.log(JSON.stringify(feedback,null,2));
        axios.post("http://localhost:4000/app/feedback_course",feedback)
        .then(Response => {
            if (Response.status === 200) {
                Swal.fire({
                    title: 'success',
                    text: "course feedback registered!",
                    icon: 'success',
                    confirmButtonText: 'ok'
                  }).then((result) =>{
                      if (result.isConfirmed) {      
                          sessionStorage.removeItem('cID')
                        window.location.replace("/dashboard")                        
                          
                      }
                  }
                  )
            }
        })
        }
        
        

        
    } 
    
    
    render(){  
        this.rating_name(this.state.rating);          
    return (
        <div className="auth-wrapper1">
        <div className="auth-inner1 ">
        <div className="container1">
            <h1 className='t'>Rating </h1>
            
            {[...Array(5)].map((star,i) => {
                const ratingValue = i + 1;
                
                getID();             
                

                return <label>
                    <input  type="radio" name="rating" value={ratingValue}                                       
                     onClick={() => this.setState({rating:ratingValue})}></input>
                    <FaStar className = "star" size={50}  
                    onMouseEnter = {() => this.setState({hover:ratingValue})}                    
                    onMouseLeave = {() => this.setState({hover:null})}                    
                    color ={ratingValue <= (this.state.hover||this.state.rating) ? "#ffc107" : "#e4e5e9"}/>                    
                    </label>                    
            })}
            <h2 id="rating" style={styling} value={this.state.rating}>{rName}</h2>
            <h1 className="t">Review </h1>
            <textarea id="review" type = 'text' className="review" ></textarea>
            <br></br>
            <button onClick={this.submit}>submit</button>
            
            
            
            
        </div>
        </div>
        </div>
    )
    
}

}

export default StarRating
