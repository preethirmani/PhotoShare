import React, { Component } from 'react';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default class ProfileByHandle extends Component {

   componentDidMount() {
   this.props.getCurrentUserProfile();
   this.props.getUserPosts();
  }


  render() {
    const { user }=this.props.auth;
    const { userPosts } = this.props.posts; 
   

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
          <Link to='/changePassword'>
          <img src={settings} className="img-settings"/>
          </Link>
           
         </div>
         <div className="div2">
           <span className='span-msg span-posts'>{userPosts.length} posts</span>
           <span className='span-msg span-fllwrs'>{} following</span>
           <span className='span-msg span-fllwng'>{} followers</span>
           
         </div>
         <p className="div-name">{user.name}</p>
            
       </div>
     </div>
    
    <div className='row-bottom'>
      {
        userPosts.map(item => {
          return (
            <img className='img-gallery' src={item.image}/>
          )
        })
       
      }

      </div>
  </div>

    );
  }
}
