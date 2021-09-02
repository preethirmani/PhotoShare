import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import FollowList from './FollowList';
import { getfollowersList } from '../../actions/profileAction';

class Followers extends Component {
 componentDidMount() {
    this.props.getfollowersList(this.props.match.params.id);
  }

  render() {
     const { followers,loading } = this.props.profile;
     let followContent;

     if(loading || followers === null) {
       followContent = <Spinner />
     } else {
       followContent = 
        <div className='ow d-flex justify-content-center main-div-followCard'>
          <div className ='card following-card' >
              <div className='card-header follow-header'> 
                  <h6 
                  className='card-subtitle suggestion-title mb-2 text-muted follow-title'>Followers</h6>
                </div>
              <div className='card-body'>
                <FollowList following={followers}/>
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

Followers.propTypes = {
  getfollowersList : PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile : state.profile
})

export default connect(mapStateToProps,{getfollowersList}) (Followers);
