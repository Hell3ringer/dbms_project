import React, { Component } from 'react';
import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Search extends Component{
    render() {
        
        return(
            <div> 
                <div class="input-group rounded">
                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                        aria-describedby="search-addon" />
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                    </span>
                </div>
            </div>
        )
    }
}

export default Search