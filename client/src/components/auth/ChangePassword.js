import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { changePasword } from '../../actions/authActions'
import '../../css/changePassword.css';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password2: '',
      oldPassword: '',
      erros: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  onSubmit(e) {
    const { user } = this.props.auth;
    e.preventDefault();
    const newPassword = {
       password: this.state.password,
      password2: this.state.password2,
      oldPassword: this.state.oldPassword,
      email: user.email
    }
    console.log('newPassword::'+newPassword);
    this.props.changePasword(newPassword);
  }

  render() {
    const { errors } = this.state;
    
    return (
      <div className= "row d-flex justify-content-center main-div-chgPwd">
      <div className= "card  chgPwd-wrapper">
        <h5 className='chgPwd-title' >Change Password</h5>
      <div className= "card-body">
       

       <form noValidate onSubmit = {this.onSubmit.bind(this)}
       className= "input-form">

          <div className= "form-group form-control-chgPwd">

          

            <input type="password" 
            className= 'form-control'
            name='password' value={this.state.password}
            onChange = {this.onChange.bind(this)}
             id="password" placeholder="Password"/>
             
             

          </div>

          <div className= "form-group form-control-chgPwd">
            <input type="password" name="password2" 
             value={this.state.password2}
            className='form-control'
            onChange = {this.onChange.bind(this)}
            placeholder="Confirm Password"/>
           
          </div>

          <div className= "form-group form-control-chgPwd">
            <input type="password" value={this.state.oldPassword}
            className='form-control'
            onChange = {this.onChange.bind(this)}
             name="oldPassword" placeholder="Old Password"/>
           

          </div>

          <button type="submit" className= "btn btn-primary">Submit</button>

        </form>

      </div>
    </div>
  </div>
    )
  }
}

ChangePassword.propTypes = {
  changePasword : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect (mapStateToProps, {changePasword}) (ChangePassword);
