import logo from './logo.svg';
import './App.css';
import Login from './components/login.component'
import SignUp from './components/signup.component'
import {Route, Switch} from 'react-router-dom'
import error from './components/error'
function App() {
  return (
    <div>
      {<Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/sign-up' component={SignUp}/>
        <Route component={error}/>
      </Switch>}
    </div>
  );
}

export default App;
