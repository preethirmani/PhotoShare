import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import phone from '../../img/phone.png';
import '../../css/login.css'


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email : '',
      password : '',
      errors : {}
    }
  }
  onChange(e) {
    //btnSubmit.disabled = false;
    this.setState({[e.target.name]:e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email:this.state.email,
      password:this.state.password
    };

    axios
    .post('/api/users/login', user)
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response.data));

  }

  render() {
    return (
      <div className="row">
        <div className="col col-img">
          <img className='landing-img' src={phone} alt='Brand' />
        </div>
        <div className="col col-form">
          <div className="card card-sigin">
            <div className='card-body'>
              <h1 className="card-title">PhotoShare</h1>
              <form className="input-form" onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
									<input type="email" className="form-control form-control-input" name="email"  value={this.state.email}
                  onChange={this.onChange.bind(this)}
									placeholder="Email"/>
								</div>
                <div className="form-group">
									<input type="password" className="form-control form-control-input" name="password" value={this.state.password}
                  onChange={this.onChange.bind(this)}
									placeholder="Password"/>
								</div>

                <button type="submit" className="btn  btn-primary " id="btnSubmit">Login</button>
              </form>
              <div className="sign-up-wrapper">
							<p>Don't have an account?
								<Link to="/register" className="sign-up">SignUp</Link>
								<Link to="/forgotPassword" className="forgot-password">Forgot password?</Link>
                <Link to="/profile" >Profile</Link>
							</p>
						</div>
            </div>

            </div>
        </div>
      
      </div>
    )
  }
}
export default Login;