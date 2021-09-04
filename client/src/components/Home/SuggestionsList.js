import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import SuggestionContent from './SuggestionContent';

class SuggestionsList extends Component {
  render() {
    const { suggestions, auth } = this.props;
  
    console.log('suggestions:'+suggestions);
    return (
      <div>
          <div className ='card profile-card'> 
            <div className='card-body profile-card'>
            <Link to={`/profilehanlde/${auth.user.username}`}>
              <img className='rounded-circle avatar-user' src={auth.user.avatar}/>
              <span className='user-handle'>{auth.user.username}</span>
              </Link>
            </div>
          </div>
          <div className ='card suggestions-card' >
            <div className='card-body'>
              <div className='suggestions-header'> 
                  <h6 className='card-subtitle suggestion-title mb-2 text-muted'>Suggestions For You</h6>
                  <Link to ='/suggestions'>
                    <span className='card-subtitle mb-2 suggestion-title-All text-muted'>See All</span>
                  </Link>
                </div>
                <SuggestionContent suggestions={suggestions}/>
              </div>          
            </div>
        </div>
    )
  }
}
SuggestionsList.propTypes = {
  suggestions : PropTypes.array.isRequired
  
};

const mapStateToProps = state => ({
  auth : state.auth
});
export default connect (mapStateToProps,{}) (SuggestionsList);