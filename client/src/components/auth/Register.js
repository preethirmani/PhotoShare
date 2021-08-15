import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import  axios from 'axios';
import '../../css/register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
     e.preventDefault();

     const newUser = {
       name: this.state.name,
       email: this.state.email,
       password:this.state.password,
       password2:this.state.password2
     };
     axios
     .post('/api/users/register', newUser)
     .then(res => console.log(res.data))
     .catch(err => console.log(err.response.data));
    
    
  }

  render() {
    return (
      <div className= "row d-flex justify-content-center main-div-register">
        <div className= "card  register-wrapper">
          <div className= "card-body">
            <h1 className= "card-title">PhotoShare</h1>
            <p className='p-text'>Sign up to see photos and videos from your friends.</p>
            <form className= "input-form" onSubmit={this.onSubmit.bind(this)}>
              <div className= "form-group form-control-register">
                <input type="text" className= "form-control" name="name" 
                value={this.state.name} onChange={this.onChange.bind(this)}
                placeholder="Enter name"/>
              </div>

              <div className= "form-group form-control-register">
                <input type="email" className= "form-control" name="email" aria-describedby="emailHelp" value={this.state.email}
                onChange={this.onChange.bind(this)} placeholder="Enter email"/>
                <small id="emailHelp" className= "form-text text-muted">We'll never share your email with anyone else.</small>
              </div>

              <div className= "form-group form-control-register">
                <input type="password" className= "form-control" name="password" value={this.state.password} onChange={this.onChange.bind(this)}
                placeholder="Password"/>
              </div>

              <div className= "form-group form-control-register">
                <input type="password" className= "form-control" name="password2" value={this.state.password2} onChange={this.onChange.bind(this)}
                placeholder="Confirm Password"/>
              </div>

              <button type="submit" className="btn btn-primary">Sign Up</button>  

            </form>
          </div>

        </div>

          <div className="form-group div-back-login">
            <Link className="back-login" to="/" >Back to Login</Link>
          </div>

      </div>
    )
  }
}

export default Register;