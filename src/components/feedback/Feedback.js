import React, { Component } from 'react'
import StarRating from './StarRating'

export class Feedback extends Component {
    render() {
        return (
            <div className="container">
                <h1>Feedback</h1>
                <StarRating ></StarRating>
            </div>
        )
    }
}

export default Feedback
