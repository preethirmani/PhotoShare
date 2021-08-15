import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../css/editProfile.css';
import '../../css/changePassword.css';

export default class EditProfile extends Component {
  render() {
    return (
      <div>
        <div className='row d-flex justify-content-center main-div-editPrfl'>
          <div className="card editPrfl-wrapper">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="true" to="#">Edit Profile</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/changePassword">Change Password</Link>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <form className= "form-edit-prfl">
                <div className= "form-group form-grp-div">
                  <label for="" class="form-label form-label-edit">Name</label>
                  <input type="text" className= "form-control frm-ctrl-name" name="name" 
                  placeholder="Enter name"/>
                </div>

                <div className= "form-group form-grp-div">
                  <label for="" class="form-label form-label-edit">Email</label>
                  <input type="email" className= "form-control frm-ctrl-email" name="email"
                  placeholder="Enter email"/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label for="" class="form-label form-label-edit">handle</label>
                  <input type="text" className= "form-control frm-ctrl-handle" name="handle"  
                  placeholder="handle"/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label for="" class="form-label form-label-edit">Gender</label>
                  <input type="text" className= "form-control frm-ctrl-gndr" name="gender" 
                  placeholder="Gender"/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label for="" class="form-label form-label-edit">PhoneNumber</label>
                  <input type="number" className= "form-control frm-ctrl-phNum" name="phoneNumber" 
                  placeholder="PhoneNumber"/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label for="" class="form-label form-label-edit">Website</label>
                  <input type="text" className= "form-control frm-ctrl-Website" name="website" 
                  placeholder="Website"/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label for="bio" class="form-label form-label-edit">Bio</label>
                  <input type="text" className= "form-control frm-ctrl-bio" name="bio" id="bio"
                  placeholder="Bio"/> 
                </div>

                <div className= "form-group form-grp-div">
                  <label for="" class="form-label form-label-edit">Location</label>
                  <input type="text" className= "form-control frm-ctrl-location" name="location" 
                  placeholder="Location"/> 
                </div>

                <button type="submit" className="btn btn-primary btn-edit-prfl">Submit</button>  

              </form>
            </div>
          </div>
        </div>
      </div>

       
    )
  }
}
