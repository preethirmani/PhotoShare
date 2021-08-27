import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentUserProfile } from '../../actions/profileAction';
import { getUserPosts } from '../../actions/PostActions';
import '../../css/profile.css';
import settings from '../../img/settings.png';

class CurrentUserProfile extends Component {

   componentDidMount() {
   this.props.getCurrentUserProfile();
   this.props.getUserPosts();
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}


Profile.propTypes = {
  auth : PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  getCurrentUserProfile : PropTypes.func.isRequired,
  getUserPosts : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile : state.profile,
  posts : state.posts

});

export default connect (mapStateToProps,{getCurrentUserProfile , getUserPosts}) (CurrentUserProfile);