import React from 'react'
import {Route,Redirect} from 'react-router-dom'

var token = localStorage.getItem('loginID')

export function ProtectedRouteStudent({ component:Component ,...rest}) {
    var auth = false;
    if (token) {
        console.log(token);
        if(token[6]+token[7]==='PS'){
            auth=true
        }else {
            auth=false
        }
    } 
    else{
        auth=false
    }

    return (
            <Route {...rest} render = {(props) => {
                console.log('auth is '+auth);
                if (auth) {
                    return <Component {...props} />
                } else {
                    return <Redirect to ={{pathname:'/',state : props.location}} />
                }
            }}
            />
        )

}
export function ProtectedRouteProfessor({ component:Component ,...rest}) {
    var auth = false;
        if (token) {
            if(token[4]+token[9]==='PH'){
                auth=true
            }else {
                auth=false
            }
        } 
        else{
            auth=false
        }
    
    return (
            <Route {...rest} render = {(props) => {
                if (auth) {
                    return <Component {...props} />
                } else {
                    return <Redirect to ={{pathname:'/',state : props.location}} />
                }
            }}
            />
        )
    }

export function ProtectedRouteAdmin({ component:Component ,...rest}) {
    var auth = false;
        if (token) {
            if(token[4]+token[9]==='AH'){
                auth=true
            }else {
                auth=false
            }
        } 
        else{
            auth=false
        }
    
    return (
            <Route {...rest} render = {(props) => {
                if (auth) {
                    return <Component {...props} />
                } else {
                    return <Redirect to ={{pathname:'/',state : props.location}} />
                }
            }}
            />
        )
    }