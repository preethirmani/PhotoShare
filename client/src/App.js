
import React,{ Component } from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import jwt_decode from 'jwt-decode';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ChangePassword from './components/auth/ChangePassword';
import Profile from './components/Profile/Profile';
import Navbar from './components/layout/Navbar';
import EditProfile from './components/Profile/EditProfile';
import Home from './components/Home/Home';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import { SET_CURRENT_USER } from './actions/types';
import { logoutUser } from './actions/authActions';
import CreatePost from './components/Posts/CreatePost';
import Suggestions from './components/Home/Suggestions';
import ProfileByHandle from './components/Profile/ProfileByHandle';


  if(localStorage.jwtToken){
    //set token to auth header
    setAuthToken(localStorage.jwtToken);
    //Decode Token
    const decoded = jwt_decode(localStorage.jwtToken);
    
    //Checking for Token Expiry
    const currentTime = Date.now()/1000;
    if (decoded.exp < currentTime){
     //Token Expired - Logout User
      store.dispatch(logoutUser());
      //Redirect to Login
      window.location.href = "/";
    }

     //dispatch
    store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });

  }

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
            <Route exact path='/changePassword' component={Navbar} />
            <Route exact path='/profile' component={Navbar} />
            <Route exact path='/profile' component={Profile} />
             <Route exact path='/editProfie' component={Navbar} />
            <Route exact path='/editProfie' component={EditProfile}/>
            <Route exact path='/home' component={Navbar} />
            <Route exact path='/home' component={Home}/>
            <Route exact path='/createPost' component={Navbar} />
            <Route exact path='/createPost' component={CreatePost}/>
             <Route exact path='/suggestions' component={Suggestions}/>
             <Route exact path='/suggestions' component={Navbar}/>
              <Route exact path='/profilehanlde/:handle' component={Navbar} />
            <Route exact path='/profilehanlde/:handle' component={ProfileByHandle}/>
            </div>
          </Router>
        </Provider>
    )
  }
  
}

export default App;
