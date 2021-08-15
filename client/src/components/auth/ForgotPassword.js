import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import lock from '../../img/Padlock.png';
import '../../css/forgotPassword.css';

class ForgotPassword extends Component {
  render() {
    return (
      <div className="row d-flex justify-content-center main-div-fgtPwd">
      <div className="card card-fgtpwd">
        <img src={lock} className="img-lock card-img-top" alt='lockImage'/>
        <h6>Trouble Logging in?</h6>
        <p>Enter your email we will send you a temporary password to get back into your account</p>
        <div className="form-group"> 
          <input type="email" className="form-control form-control-input" id="email" 
            placeholder="email"/>
        </div>
        
        <Link to="#" className="btn btn-primary ">Send Temporary Password</Link>
        
        <div className="line-div">
          <hr className="line"/>
          <span className="line line-or">OR</span>
          <hr className="line"/>
        </div>
    
       
       <Link className='new-acct' to="/register">Create New account</Link>
        <div className="form-group div-back-login">
      <Link className="back-login" to="/" >Back to Login</Link>
    </div>

      </div>

    </div>
    )
  }
}

export default ForgotPassword;
