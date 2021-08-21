
import React,{ Component } from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ChangePassword from './components/auth/ChangePassword';
import Profile from './components/Profile/Profile';
import Navbar from './components/layout/Navbar';
import EditProfile from './components/Profile/EditProfile';
import Home from './components/Home/Home';
import store from './store'

import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/forgotPassword' component={ForgotPassword} />
            <Route exact path='/changePassword' component={ChangePassword} />
            <Route exact path='/profile' component={Navbar} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/editProfie' component={EditProfile}/>
            <Route exact path='/home' component={Navbar} />
            <Route exact path='/home' component={Home}/>
            </div>
          </Router>
        </Provider>
    )
  }
  
}

export default App;
