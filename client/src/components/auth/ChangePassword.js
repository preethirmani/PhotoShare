import React, { Component } from 'react';
import '../../css/changePassword.css';

class ChangePassword extends Component {
  render() {
    return (
      <div class="row d-flex justify-content-center main-div-chgPwd">
      <div class="card  chgPwd-wrapper">
      <div class="card-body">
        <h1 class="card-title">Photoshare</h1>
      
        <form class="input-form">
          <div class="form-group form-control-chgPwd">
            <input type="text" class="form-control" id="name" placeholder="Enter name"/>
          </div>

          <div class="form-group form-control-chgPwd">
            <input type="email" class="form-control" id="email" placeholder="Enter email"/>
          </div>

          <div class="form-group form-control-chgPwd">
            <input type="password" class="form-control" id="password" placeholder="Password"/>
          </div>

          <div class="form-group form-control-chgPwd">
            <input type="password" class="form-control" id="password2" placeholder="Confirm Password"/>
          </div>

          <div class="form-group form-control-chgPwd">
            <input type="password" class="form-control" id="oldPassword" placeholder="Temporary Password"/>
          </div>

          <button type="submit" class="btn btn-primary">Sign Up</button>

        </form>

      </div>
    </div>
  </div>
    )
  }
}

export default ChangePassword;
