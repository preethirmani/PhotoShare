import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getfollowingList } from '../../actions/profileAction';
import FollowList from './FollowList';
import Spinner from '../common/Spinner';
import '../../css/follow.css'

class Following extends Component {

  componentDidMount() {
    this.props.getfollowingList(this.props.match.params.id);
  }

  render() {
     const { following,loading } = this.props.profile;
     let followContent;

     if(loading || following === null) {
       followContent = <Spinner />
     } else {
       followContent = 
        <div className='row d-flex justify-content-center main-div-followCard'>
          <div className ='card following-card' >
              <div className='card-header follow-header'> 
                  <h6 
                  className='card-subtitle suggestion-title mb-2 text-muted follow-title'>Following</h6>
                </div>
              <div className='card-body'>
                <FollowList following={following}/>
              </div>          
            </div>
          </div>
          
     }

   
    return (
      <div>
          {followContent}
        </div>
    )
  }
}

Following.propTypes = {
  getfollowingList : PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile : state.profile
})

export default connect(mapStateToProps,{getfollowingList}) (Following);
