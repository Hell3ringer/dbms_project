import './App.css';
import Login from './components/registration/login'
import SignUp from './components/registration/signup'
import {Route, Switch} from 'react-router-dom'
import error from './components/error'
function App() {
  return (
    <div>
      {<Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route component={error}/>
      </Switch>}
    </div>
  );
}

export default App;
