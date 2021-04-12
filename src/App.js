import './App.css';
import Login from './components/registration/login'
import SignUp from './components/registration/signup'
import details from './components/registration/details'

import dashboard from './components/dashboard/dashboard'
import profile from './components/profile/profile'
import dashboard_prof from './components/dashboard/dashboard_prof'
import {Route, Switch} from 'react-router-dom'
import error from './components/error'
import profile_prof from './components/profile/profile_prof';
import dashboard_admin from './components/dashboard/dashboard_admin';
import modify_courses from './components/modify_courses/modify_courses';

import Feedback from './components/feedback/Feedback'

function App() {
  return (
    <div className="div_in_app">
      {<Switch>
        {/* registration */}
        <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/details' component={details}/>
        
        {/* dashboard */}
        <Route exact path='/dashboard' component={dashboard}/>
        <Route exact path='/dashboard_prof' component={dashboard_prof}/>
        <Route exact path='/dashboard_admin' component={dashboard_admin}/>
        <Route exact path='/profile' component={profile}/>
        <Route exact path='/profile_prof' component={profile_prof}/>
        <Route exact path='/modify_courses' component={modify_courses}/>

        {/*feedback */}
        <Route exact path='/feedback' component={Feedback}/>

        
        <Route component={error}/>
        
      </Switch>}
    </div>
  );
}

export default App;
