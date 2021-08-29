import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { followUser, unfollowUser } from '../../actions/profileAction';
import "../../css/home.css";

class Suggestion extends Component {
  constructor() {
    super();
    this.state = {
      follow : false
    };
  }

    onClickFollow(id) {
    this.setState({ follow: true });
    this.props.followUser(id);
  }

  onCLickUnFollow(id) {
    this.setState({ follow: false });
    this.props.unfollowUser(id);
  }


  
  render() {
    const { suggestion, auth } = this.props;
    return (
      <div>
          <Link className='suggestion-link' to={`/profile/${suggestion.handle}`}>
            <img
                className='rounded-circle suggestion-image'
                src={suggestion.user.avatar}
                alt='avatar'
              />
            
            <span className='suggestion-handle'>{suggestion.handle}</span>
          </Link>
          <span className='span-sggn-follow'>
            {!this.state.follow && (
            <Link onClick={this.onClickFollow.bind(this, suggestion.user._id)}>
              Follow
            </Link>
          )}
          {this.state.follow && (
            <Link onClick={this.onCLickUnFollow.bind(this, suggestion.user._id)}>
              Following
            </Link>
          )}
            </span>
      </div>
    )
  }
}

Suggestion.propTypes = {
  followUser : PropTypes.func.isRequired,
  unfollowUser : PropTypes.func.isRequired
}

export default connect (null, {followUser, unfollowUser}) (Suggestion);
