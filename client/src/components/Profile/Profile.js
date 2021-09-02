import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentUserProfile } from '../../actions/profileAction';
import { getUserPosts } from '../../actions/PostActions';
import Spinner from '../common/Spinner';
import '../../css/profile.css';
import settings from '../../img/settings.png';


class Profile extends Component {


  componentDidMount() {
   this.props.getCurrentUserProfile();
   this.props.getUserPosts();
  }


  render() {
    const { user }=this.props.auth;
     const { currentProfile }=this.props.profile;
    const { userPosts } = this.props.posts; 
    let loadingPost = this.props.posts.loading;
    let loadingProfile = this.props.profile.loading;
    let profileContent;
   
   if(loadingPost || loadingProfile || userPosts === null || currentProfile === null) {
     profileContent = <Spinner />
   } else {
     profileContent = 
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
           <Link className='follow-Link' to={'/following'}>
              <span className='span-msg span-fllwrs'>
             {currentProfile.following.length} following
             </span>
           </Link>
           <Link className='follow-Link'>
               <span className='span-msg span-fllwng'>
             {currentProfile.followers.length} followers
             </span>
           </Link>
          
           
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


   }

  return(
  
      <div>{profileContent}</div>
    );
  }

}

Profile.propTypes = {
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired,
  posts : PropTypes.object.isRequired,
  getCurrentUserProfile : PropTypes.func.isRequired,
  getUserPosts : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth : state.auth,
  profile : state.profile,
  posts : state.posts

});

export default connect (mapStateToProps,{getCurrentUserProfile , getUserPosts}) (Profile);