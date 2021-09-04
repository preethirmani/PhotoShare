import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getAllPosts } from '../../actions/PostActions';
import { getCurrentUserProfile, getSuggestions } from '../../actions/profileAction';
import SuggestionsList  from './SuggestionsList';
import PostsContent from './PostsContent';
import Spinner from '../common/Spinner';

import "../../css/home.css";

class Home extends Component {

  componentDidMount() {
    this.props.getAllPosts();
    this.props.getSuggestions();
    this.props.getCurrentUserProfile();
  }

  render() {

   
  

    const {  loading, posts } = this.props.posts;
    const { currentProfile, suggestions } = this.props.profile;
    const { user } = this.props.auth;
   
    let homeContent;
    let suggContent;

    if(currentProfile === null) {
      homeContent = 
       <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/editProfie" className="btn btn-lg btn-info">
              Create Profile
            </Link>
        </div>
    } else {
    
      if(posts === null || loading || suggestions === null) {

             homeContent = <Spinner />;

       } else {
            homeContent = 
                <PostsContent posts = {posts}/>;
            suggContent = 
                <SuggestionsList suggestions = {suggestions}/>;
      }
    }
    return (
     <div className='container-fluid home-main-div'>
      <div className='container '>
        <div className='row flex-nowrap homepg-posts-content' >
            <div className='col'>{homeContent}</div>
          <div className='col div-suggestions'>
            {suggContent}
          </div>
        </div>
      </div>
    </div> 
 
    )
  }
}

Home.prototypes = { 
  posts : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  getAllPosts : PropTypes.func.isRequired,
  getSuggestions : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
      auth : state.auth,
      posts : state.posts,
      profile : state.profile,
      errors : state.errors
});

export default connect(mapStateToProps, {getAllPosts, getSuggestions, getCurrentUserProfile}) (withRouter(Home));

