import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import { getAllPosts,getSuggestions } from '../../actions/PostActions';
import SuggestionsList  from './SuggestionsList';
import PostsContent from './PostsContent';
import Spinner from '../common/Spinner';

import "../../css/home.css";

class Home extends Component {

  componentDidMount() {
    this.props.getAllPosts();
    this.props.getSuggestions();
  }

  render() {

    const {  loading, posts, suggestions } = this.props.posts;
    let homeContent;
    let suggContent;
    
    if(posts === null || loading || suggestions === null) {
      
        homeContent = <Spinner />;
    } else {
      
      homeContent = 
          <PostsContent posts = {posts}/>;
      suggContent = 
          <SuggestionsList suggestions = {suggestions}/>;
     
     
          
    }
    
    return (
     <div className='container-fluid home-main-div'>
      <div className='container '>
        <div className='row' >
            <div className='col md-8'>{homeContent}</div>
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
  getAllPosts : PropTypes.func.isRequired,
  getSuggestions : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
      posts : state.posts
     
      
});

export default connect(mapStateToProps, {getAllPosts, getSuggestions}) (withRouter(Home));

