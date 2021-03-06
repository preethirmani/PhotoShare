import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, deleteAccount } from '../../actions/profileAction';
import PropTypes from 'prop-types';
import '../../css/editProfile.css';
import '../../css/changePassword.css';

class EditProfile extends Component {

  constructor(props){
    super(props);
      this.state = {
        gender : '',
        location : '',
        phoneNumber : '',
        website : '',
        bio : ''
      }
  }

  onChange(e) {
    this.setState({[e.target.name]:e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();

    const newProfile = {
        gender : this.state.gender,
        location : this.state.location,
        phoneNumber : this.state.phoneNumber,
        website : this.state.website,
        bio : this.state.bio
    }
    
    this.props.createProfile(newProfile, this.props.history);
  }

  onClickDelete(e) {
    this.props.deleteAccount(this.props.history);
  }

  render() {
    const {user} = this.props.auth;

    return (
      <div>
        <div className='row d-flex justify-content-center main-div-editPrfl'>
          <div className="card editPrfl-wrapper">
             <div className='card-header follow-header'> 
                  <h5 
                  className='card-subtitle edit-profile-title mb-2 follow-title'>
                    Edit Profile
                    </h5>
              </div>
            <div className="card-body edit-card">
              <form noValidate onSubmit = {this.onSubmit.bind(this)}
              className= "form-edit-prfl">
                <div className= "form-group form-grp-div">
                  <label  className = "form-label form-label-edit">Name</label>
                  <input type="text" className= "form-control frm-ctrl-name" value={user.name} />
                </div>

                <div className= "form-group form-grp-div">
                  <label  className = "form-label form-label-edit">Email</label>
                  <input type="email" className= "form-control frm-ctrl-email" value={user.email}/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label  className = "form-label form-label-edit">handle</label>
                  <input type="text" className= "form-control frm-ctrl-handle" value={user.username}  /> 
                </div>

                <div className= "form-group form-grp-div">
                  <label  className = "form-label form-label-edit">Gender</label>
                  <input type="text" className= "form-control frm-ctrl-gndr" name="gender" value = {this.state.gender}
                  onChange = {this.onChange.bind(this)}
                  placeholder="Gender"/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label  className = "form-label form-label-edit">PhoneNumber</label>
                  <input type="number" className= "form-control frm-ctrl-phNum" name="phoneNumber" 
                  value = {this.state.phoneNumber}
                  onChange = {this.onChange.bind(this)}
                  placeholder="PhoneNumber"/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label  className = "form-label form-label-edit">Website</label>
                  <input type="text" className= "form-control frm-ctrl-Website" value = {this.state.website}
                   onChange = {this.onChange.bind(this)}
                  name="website" placeholder="Website"/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label for="bio" className = "form-label form-label-edit">Bio</label>
                  <input type="text" className= "form-control frm-ctrl-bio" name="bio" id="bio" value = {this.state.bio}
                   onChange = {this.onChange.bind(this)} placeholder="Bio"/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label  className = "form-label form-label-edit">Location</label>
                  <input type="text" className= "form-control frm-ctrl-location" name="location" 
                  value = {this.state.location}
                  onChange = {this.onChange.bind(this)}
                  placeholder="Location"/> 
                </div>
               
                
                <button type="submit" className="btn btn-primary btn-edit-prfl">Submit</button>  

            
                
                

               
                 <Link className='delete-account' 
                 onClick = {this.onClickDelete.bind(this)} >
                  Delete Account</Link>
            

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditProfile.propTypes = {
  auth : PropTypes.object.isRequired,
  createProfile : PropTypes.func.isRequired,
  deleteAccount : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth : state.auth
});

export default connect(mapStateToProps,{createProfile, deleteAccount})(withRouter(EditProfile));
