import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import phone from '../../img/phone.png';
import '../../css/login.css'
import { loginUser } from '../../actions/authActions';


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

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/home')
    }
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email:this.state.email,
      password:this.state.password
    };

    this.props.loginUser(user);
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="row">
        <div className="col col-img">
          <img className='landing-img' src={phone} alt='Brand' />
        </div>
        <div className="col col-form">
          <div className="card card-sigin">
            <div className='card-body'>
              <h1 className="card-title">PhotoShare</h1>
              <form className="input-form" noValidate onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
									<input type="email" 
                  className={classNames('form-control form-control-input', 
                  {'is-invalid': errors.email})}
                  name="email"  value={this.state.email}
                  onChange={this.onChange.bind(this)}
									placeholder="Email"/>
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
                  )}
								</div>
                <div className="form-group">
									<input type="password" 
                   className={classNames('form-control form-control-input', 
                  {'is-invalid': errors.password})}
                  name="password" value={this.state.password}
                  onChange={this.onChange.bind(this)}
									placeholder="Password"/>
                  {errors.password && (
                    <div className='invalid-feedback'>{errors.password}</div>
                  )}
								</div>

                <button type="submit" className="btn  btn-primary ">Login</button>
              </form>
              <div className="sign-up-wrapper">
							<p>Don't have an account?
								<Link to="/register" className="sign-up">SignUp</Link>
								<Link to="/forgotPassword" className="forgot-password">Forgot password?</Link>
							</p>
						</div>
            </div>

            </div>
        </div>
      
      </div>
    )
  }
}

Login.propTypes = {
  loginUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser}) (withRouter(Login));