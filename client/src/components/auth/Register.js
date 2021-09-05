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
      avatar:'',
      errors: {}
    };
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  uploadImage(e) {
    console.log(e.target.files[0]);
    const d = new FormData();
    d.append('file', e.target.files[0]);
    d.append('upload_preset', 'fotoshare');
    d.append('cloud_name','phtoshare')
    console.log('imageURL::'+ URL.createObjectURL(e.target.files[0]));
    
    this.setState({
      formData:d
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit(e) {
     e.preventDefault();
     fetch(
     "https://api.cloudinary.com/v1_1/phtoshare/image/upload", {
      method: 'POST',  
      body: this.state.formData  
    }).then (res => res.json())
      .then(data => {
        console.log(data)
        const newUser = {
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password:this.state.password,
        password2:this.state.password2,
        avatar:data.secure_url
     };
      this.props.registerUser(newUser, this.props.history);
    })
    
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
                <input type="text" 
                className= {classnames('form-control', {'is-invalid': errors.username })} name="username" 
                value={this.state.username} 
                onChange={this.onChange.bind(this)}
                placeholder="Enter username"/>
                {errors.name && (
                  <div className="invalid-feedback">{errors.username}</div>)}
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

              <div className= "form-group form-control-register input-group mb-3">
              
                <input type="file" id='avatar'
                name="avatar" class="hidden"
                value={this.state.avatar} 
                onChange={this.uploadImage.bind(this)} />
               <label for='avatar'>Upload Profile Picture</label>
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