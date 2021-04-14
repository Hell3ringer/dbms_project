import React, { Component ,useState} from 'react'
import Swal from 'sweetalert2';
import './postbar.css'
import axios from 'axios'
import StarRating from './StarRating'
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
var customer_id,rating,review;
var givenRating ="",givenReview = "";


function getUserID(){
  var token = document.cookie.split('=')[1];
  jwt.verify(token,"thisisakeyforthejwtandisaccessedatthebackendonly",(err,decodedToken) => {
    if (err) {
        console.log(err);
    } else{
      customer_id = decodedToken.id;
    }
  })
}

function feedback(rating,review){
  getUserID();
  rating = (rating * 5)/100;  
  rating = Math.round(rating);
  console.log("rating is " + rating);
  console.log("Review is "  + review);
  const feedBack = {
    rating : rating,
    review : review,
    customer_id : customer_id,
    profession_id:"profession_id"
  }
  axios.post('http://localhost:4000/app/feedback',feedBack)
  .then(Response => {
    console.log(Response);
    
  })

}

export class Postbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cr: 1
    };
    
  }
  
    submit(Event){
        Event.preventDefault();    
        
         Swal.mixin({         
            
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2']
          }).queue([
            {
              title: 'Level of statisfaction',  
              html: '<div>starrating : <StarRating /></div>',
              
              //input : 'radio',   
              
              
             // inputValue : '50'              
            },
            {
                title:'Review',
                input: 'textarea'  
            }
          ]).then((result) => {
            
            if (result.value) {
              rating = result.value[0];
              review = result.value[1];                         
              Swal.fire({
                title: 'All done!',
                showCancelButton:true,
                html: `
                  rating:
                  <pre><code>${result.value[0]}%</code></pre>
                  review:
                  <pre><code>${result.value[1]}</code></pre>
                `,
                confirmButtonText: 'submit'
              }).then((result) => {
                if (result.isConfirmed) {  
                  
                  feedback(rating,review);
                }
              })
            }
          })
                           
          
    } 
    
    displayFeedback(){
      const givenFeedback = {
        customer_id : customer_id,
        profession_id : "professional_id"
      }
      axios.post('http://localhost:4000/app/givenFeedback',givenFeedback)
      .then(Response => {
        givenRating = Response.data.rating
        givenReview = Response.data.review
        console.log("given is " + JSON.stringify(Response.data,null,2));
      })
    }
    feeDBack(){
      window.location.replace('/feedback')
    }
    
    
    render() {
        return (
            <div className = "postbar">
                <h1>hello</h1>
                <h2>professor_id</h2>                
                
                <div> rating {givenRating}  review  {givenReview} : <input type="text" id ="message" readOnly></input></div>
                <button className="feedbackbtn" onClick = {this.feeDBack}>feedback</button>
                <button onClick = {this.displayFeedback}>click Me {"hi" + this.state.cust_rating}</button>
                
                
            </div>
        )
    }
}

export default Postbar
