import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByHandle, followUser, unfollowUser } from '../../actions/profileAction';
import { getPostsbyHandle } from '../../actions/PostActions';
import Spinner from '../common/Spinner';

class ProfileByHandle extends Component {

  constructor() {
    super();
    this.state = {
      showFollow : false
    }
  };

    componentWillReceiveProps(nextProps) { 
     const { profile } = nextProps.profile;
     const { user } = this.props.auth;
     //checking current user is a follower
     console.log('Inside nextprops');
     if (profile !== null) {
      let followersList = profile.followers.map(follower => follower.user);
       if(followersList.includes(user.id)) {
         this.setState({ showFollow: true });
       } else {
         this.setState({ showFollow: false });
       }
     }
    }



  componentDidMount() {
   this.props.getProfileByHandle(this.props.match.params.handle);
   this.props.getPostsbyHandle(this.props.match.params.handle);
  }

  
  onclickFollow(user_id, handle) {
   // window.alert('follow clicked+user_id'+ user_id);
   this.setState({showFollow: false});
    this.props.followUser(user_id, handle);
   }

  onclickUnFollow(user_id, handle) {
  //  window.alert('Unfollow clicked + user_id' + user_id);
  this.setState({showFollow: true});
    this.props.unfollowUser(user_id, handle);
  }

  render() {
    
    const { profile }=this.props.profile;
    const { postsHandle } = this.props.posts; 
    let loadingProfile = this.props.profile.loading;
    let loadingPost = this.props.posts.loading;
    let profilecontent;
  
    

    
    if (loadingPost|| loadingProfile || profile === null || postsHandle === null) {
      profilecontent = <Spinner />
    } else {
    
      profilecontent = <div className="main-div">
      <div className="row-top">
       <div className="img-div">
           <img className="profile-picture" src={profile.user.avatar}/>    
           </div>
       <div className="details-div" >
         <div className="div1">
          <h4 className="profile-handle">{profile.handle}</h4>

          {!this.state.showFollow && (
            <Link className="btn btn-follow-user" 
            onClick={this.onclickFollow.bind(this, profile.user._id, profile.handle)} 
            to={`/profilehanlde/${profile.handle}`} >Follow</Link>)}

          {this.state.showFollow && (
              <Link className="btn btn-follow-user" 
              onClick={this.onclickUnFollow.bind(this, profile.user._id, profile.handle)}
              to={`/profilehanlde/${profile.handle}`} >unFollow</Link>
          )}
        </div>
         <div className="div2">
           <span className='span-msg span-posts'>{postsHandle.length} posts</span>
           <span className='span-msg span-fllwrs'>{profile.following.length} following</span>
           <span className='span-msg span-fllwng'>{profile.followers.length} followers</span>
         </div>
         <p className="div-name">{profile.user.name}</p>   
       </div>
     </div>
    
    <div className='row-bottom'>
      {
        postsHandle.map(item => {
          return (
            <img className='img-gallery' key={item._id} src={item.image}/>
          )
        })
      }

      </div>
  </div>

}

    return(
              <div>{profilecontent}</div>
    );
  }
}

ProfileByHandle.propTypes = {
  getProfileByHandle : PropTypes.func.isRequired,
  getPostsbyHandle : PropTypes.func.isRequired,
  followUser : PropTypes.func.isRequired,
  unfollowUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  auth : state.auth,
  profile : state.profile,
  posts : state.posts
});

export default connect (mapStateToProps, {getProfileByHandle, getPostsbyHandle, followUser, unfollowUser}) (ProfileByHandle);
