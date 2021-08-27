import React, { Component } from 'react';
import { connect } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { changePasword } from '../../actions/authActions'
import '../../css/changePassword.css';

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      password2: '',
      oldPassword: ''
    };
  }

  onChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const newPassword = {
       password: this.state.password,
      password2: this.state.password2,
      oldPassword: this.state.oldPassword
    }
    this.props.changePasword(newPassword);
  }

  render() {
    return (
      <div class="row d-flex justify-content-center main-div-chgPwd">
      <div class="card  chgPwd-wrapper">
      <div class="card-body">
       

       <form class="input-form">

          <div class="form-group form-control-chgPwd">
            <input type="password" class="form-control" name='password'
            onChange = {this.onChange.bind(this)}
             id="password" placeholder="Password"/>
          </div>

          <div class="form-group form-control-chgPwd">
            <input type="password" class="form-control" 
            onChange = {this.onChange.bind(this)}
            name="password2" placeholder="Confirm Password"/>
          </div>

          <div class="form-group form-control-chgPwd">
            <input type="password" class="form-control"
            onChange = {this.onChange.bind(this)}
             name="oldPassword" placeholder="Temporary Password"/>
          </div>

          <button type="submit" class="btn btn-primary">Sign Up</button>

        </form>

      </div>
    </div>
  </div>
    )
  }
}

ChangePassword.propTypes = {
  changePasword : PropTypes.func.isRequired
};

export default connect (null, {changePasword}) (ChangePassword);
