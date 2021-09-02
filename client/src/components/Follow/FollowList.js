import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FollowComponent from './FollowComponent';

class FollowList extends Component {
  render() {
       const { following } = this.props;
    
       return following.map(follow => 
       <FollowComponent key={follow._id} follow={follow} />);
   
  }
}

FollowList.propTypes = {
  following: PropTypes.array.isRequired
};

export default FollowList
