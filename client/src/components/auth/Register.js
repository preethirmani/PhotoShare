import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit(e) {
     e.preventDefault();

     const newUser = {
       name: this.state.name,
       email: this.state.email,
       password:this.state.password,
       password2:this.state.password2
     };
     this.props.registerUser(newUser, this.props.history);
    
  }

  render() {
    const {errors} = this.state
    return (
      <div className= "row d-flex justify-content-center main-div-register">
        <div className= "card  register-wrapper">
          <div className= "card-body">
            <h1 className= "card-title">PhotoShare</h1>

            <p className='p-text'>Sign up to see photos and videos from your friends.</p>

            <form className= "input-form" noValidate onSubmit={this.onSubmit.bind(this)}>

              <div className= "form-group form-control-register">
                <input type="text" 
                className= {classnames('form-control', {'is-invalid': errors.name })} name="name" 
                value={this.state.name} onChange={this.onChange.bind(this)}
                placeholder="Enter name"/>
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>)}
              </div>

              <div className= "form-group form-control-register">
                <input type="email" 
                className= {classnames('form-control', {'is-invalid': errors.email})}  
                name="email" aria-describedby="emailHelp" value={this.state.email}
                onChange={this.onChange.bind(this)} placeholder="Enter email"/>
                <small id="emailHelp" className= "form-text text-muted">We'll never share your email with anyone else.</small>
                
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>)}

              </div>

              <div className= "form-group form-control-register">
                <input type="password" 
                className= {classnames('form-control',{'is-invalid': errors.password})}
                 name="password" value={this.state.password} onChange={this.onChange.bind(this)}
                placeholder="Password"/>

                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>)}

              </div>

              <div className= "form-group form-control-register">
                <input type="password" 
                className= {classnames('form-control',{'is-invalid': errors.password2})}
                name="password2" value={this.state.password2} onChange={this.onChange.bind(this)}
                placeholder="Confirm Password"/>

                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>)}

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

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser}) (withRouter(Register));