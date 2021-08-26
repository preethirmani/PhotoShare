import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../css/profile.css';
import settings from '../../img/settings.png';

class Profile extends Component {

  render() {
    const { isAuthenticated, user }=this.props.auth;

    return(
   <div className="main-div">
     <div className="row-top">
       <div className="img-div">
           <img className="profile-picture" src={user.avatar}/>    
       </div>
       <div className="details-div" >
         <div className="div1">
          <h4 className="profile-handle">{user.username}</h4>
          <Link className="btn btn-edit-profile" to='/editProfie'>Edit Profile</Link>
          <img src={settings} className="img-settings"/>
           
         </div>
         <div className="div2">
           <span className='span-msg span-posts'>12 posts</span>
           <span className='span-msg span-fllwrs'>68 followers</span>
           <span className='span-msg span-fllwng'>79 following</span>
           
         </div>
         <p className="div-name">{user.name}</p>
            

       </div>
     </div>
    
    <div className='row-bottom'>
      
        <img className='img-gallery' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
        <img className='img-gallery' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>

        <img className='img-gallery' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>

        <img className='img-gallery' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>

        <img className='img-gallery' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>

        <img className='img-gallery' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>

        <img className='img-gallery' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>

        <img className='img-gallery' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>

        <img className='img-gallery' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>

        <img className='img-gallery' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>

      </div>
  </div>

    );
  }

}

const mapStateToProps = state => ({
  auth: state.auth

});

export default connect (mapStateToProps,{}) (Profile);