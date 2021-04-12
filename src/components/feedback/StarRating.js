import axios from 'axios';
import React ,{Component} from 'react'
import { FaStar } from 'react-icons/fa'
import './StarRating.css'
var rName;
var rColour;
var styling = {
    color:rColour
}


class  StarRating extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             rating : null,
             hover : null
        }
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
        styling = {
            color:rColour
        }
        
        
    }
    submit(rating,review){
        const feedback = {
            rating : rating,
            review : review
        }
        axios.post("",feedback)
        .then(Response => {

        })
    }    

    
    render(){        
    return (
        <div className="auth-wrapper1">
        <div className="auth-inner1 ">
        <div className="container1">
            <h1>Rating </h1>
            
            {[...Array(5)].map((star,i) => {
                const ratingValue = i + 1;
                this.rating_name(this.state.rating);
                
                

                return <label>
                    <input  type="radio" name="rating" value={ratingValue}                                       
                     onClick={() => this.setState({rating:ratingValue})}></input>
                    <FaStar className = "star" size={100}  
                    onMouseEnter = {() => this.setState({hover:ratingValue})}                    
                    onMouseLeave = {() => this.setState({hover:null})}                    
                    color ={ratingValue <= (this.state.hover||this.state.rating) ? "#ffc107" : "#e4e5e9"}/>                    
                    </label>                    
            })}
            <h2  style={styling}>{rName}</h2>
            <h1>Review </h1>
            <textarea  type = 'text' className="review"  ></textarea>
            <br></br>
            <button >submit</button>
            
            
            
            
        </div>
        </div>
        </div>
    )
    
}

}

export default StarRating
